#!/usr/bin/env node

import fs from "fs/promises";
import cliProgress from "cli-progress";

const baseURL = process.env.GW2_API_URL || "https://api.guildwars2.com/v2";
const OUTFILE = process.env.OUTFILE || "app/lib/achievements.json";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "4", 10);

const bar = new cliProgress.SingleBar(
  {
    format:
      "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed}",
  },
  cliProgress.Presets.shades_classic
);

async function fetchJson(url, init, { retries = 3, backoffMs = 500 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const resp = await fetch(url, init);
    if (resp.ok) return resp.json();
    const status = resp.status;
    const body = await resp.text().catch(() => "");
    const transient = status >= 500 || status === 429;
    if (attempt < retries && transient) {
      const wait = backoffMs * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    throw new Error(`Fetch failed ${status} ${url}\n${body}`);
  }
}

const reqConfig = {
  headers: { "Content-Type": "application/json" },
};

const getAchievementsGroups = async () =>
  fetchJson(`${baseURL}/achievements/groups`, reqConfig);

const getAchievementsGroupById = async (groupId) =>
  fetchJson(`${baseURL}/achievements/groups/${groupId}`, reqConfig);

const getAchievementsCategoriesByIds = async (idsCsv) =>
  fetchJson(`${baseURL}/achievements/categories?ids=${idsCsv}`, reqConfig);

const getAchievementsByIds = async (idsCsv) => {
  if (!idsCsv) return [];
  return fetchJson(`${baseURL}/achievements?ids=${idsCsv}`, reqConfig);
};

// Simple async pool
async function asyncPool(poolSize, iterable, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of iterable) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolSize <= iterable.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolSize) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

try {
  const groupsIds = await getAchievementsGroups();
  bar.start(groupsIds.length, 0);

  // Fetch groups in parallel (bounded)
  const groups = await asyncPool(CONCURRENCY, groupsIds, async (groupId) => {
    const group = await getAchievementsGroupById(groupId);
    bar.increment();
    return group;
  });

  // Prepare totals for bar
  let totalCategories = 0;
  for (const g of groups) totalCategories += g.categories.length;
  bar.setTotal(bar.getTotal() + totalCategories);

  // Fetch categories per group
  for (const g of groups) {
    const categories = await getAchievementsCategoriesByIds(g.categories.join(","));
    g.categories = categories;
    bar.increment(categories.length);
  }

  // Compute total achievements for progress
  let totalAchievements = 0;
  for (const g of groups) {
    for (const c of g.categories) totalAchievements += c.achievements.length;
  }
  bar.setTotal(bar.getTotal() + totalAchievements);

  // Fetch achievements per category with bounded concurrency
  for (const g of groups) {
    await asyncPool(CONCURRENCY, g.categories, async (c) => {
      c.achievements = await getAchievementsByIds(c.achievements.join(","));
      bar.increment(c.achievements.length);
    });
  }

  bar.stop();

  await fs.writeFile(OUTFILE, JSON.stringify(groups, null, 2), "utf-8");
  console.log(`Saved ${OUTFILE}`);
} catch (err) {
  bar.stop();
  console.error("Export failed:", err?.message || err);
  process.exitCode = 1;
}
