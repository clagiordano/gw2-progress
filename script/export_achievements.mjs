#!/usr/bin/env node

import fs from "fs";
import cliProgress from "cli-progress";
const bar = new cliProgress.SingleBar(
  {
    format:
      "progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed}",
  },
  cliProgress.Presets.shades_classic
);

const baseURL = "https://api.guildwars2.com/v2";
const reqConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getAchievementsGroups = async () => {
  const resp = await fetch(`${baseURL}/achievements/groups`, reqConfig);
  return await resp.json();
};

const getAchievementsGroupById = async (groupId) => {
  const resp = await fetch(
    `${baseURL}/achievements/groups/${groupId}`,
    reqConfig
  );
  return await resp.json();
};

const getAchievementsCategoryById = async (cId) => {
  const resp = await fetch(
    `${baseURL}/achievements/categories?ids=${cId}`,
    reqConfig
  );
  return await resp.json();
};

const getAchievementById = async (aId) => {
  if (!aId) {
    /**
     * On emprty aId directly returns an empty array to avoid useless api calls
     */
    return [];
  }
  const resp = await fetch(`${baseURL}/achievements?ids=${aId}`, reqConfig);
  if (!resp) {
    console.error(`invalid response on: ${baseURL}/achievements?ids=${aId}`);
    return [];
  }

  return await resp.json();
};

/**
 * Fetch achievements groups
 */
const achievements = await getAchievementsGroups();

bar.start(achievements.length, 0);
for (const idx in achievements) {
  /**
   * Populate groups
   */
  achievements[idx] = await getAchievementsGroupById(achievements[idx]);
  bar.setTotal(bar.getTotal() + achievements[idx].categories.length);
  bar.increment();

  /**
   * Populate categories
   */
  achievements[idx].categories = await getAchievementsCategoryById(
    achievements[idx].categories.join(",")
  );
  bar.increment(achievements[idx].categories.length);

  /**
   * Populate achievements
   */
  for (const cId in achievements[idx].categories) {
    bar.setTotal(
      bar.getTotal() + achievements[idx].categories[cId].achievements.length
    );
    achievements[idx].categories[cId].achievements = await getAchievementById(
      achievements[idx].categories[cId].achievements.join(",")
    );
    bar.increment(achievements[idx].categories[cId].achievements.length);
  }
}

bar.stop();

fs.writeFileSync(
  "app/lib/achievements.json",
  JSON.stringify(achievements),
  (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  }
);
