import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const baseURL = "https://api.guildwars2.com/v2";
const reqConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.ANET_ACCESS_TOKEN}`,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const OUTPUT_PATH = path.join(process.cwd(), "app/lib", "skins.json");

// Configurazione
const BATCH_SIZE = 200;          // max IDs per batch
const CONCURRENT_LIMIT = 5;      // batch paralleli
const MAX_RETRIES = 3;           // retry su errore
const RETRY_DELAY = 1000;        // ms tra retry

// Delay helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Funzione per chunk di array
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Funzione fetch con retry
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, reqConfig);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      console.warn(`[fetchWithRetry] ⚠️ Tentativo ${attempt} fallito: ${err}`);
      if (attempt < retries) await sleep(RETRY_DELAY * attempt);
      else throw err;
    }
  }
}

// Funzione fetch batch
async function fetchBatch(ids) {
  const url = `${baseURL}/skins?ids=${ids.join(",")}&lang=en`;
  return fetchWithRetry(url);
}

// Async pool con indice corretto
async function asyncPool(poolLimit, array, iteratorFn) {
  const results = [];
  const executing = [];
  for (let i = 0; i < array.length; i++) {
    const skin = array[i];
    const p = Promise.resolve().then(() => iteratorFn(skin, i));
    results.push(p);

    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);

    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

async function upsertSkinsToSupabase(skins) {
  const payload = skins.map(skin => ({
    id: skin.id,
    data: skin,
  }));

  const { error } = await supabase
    .from("skins")
    .upsert(payload, { onConflict: ["id"] });

  if (error) throw error;
}

async function updateSkins() {
  console.log("[updateSkins] 🚀 Fetch lista ID...");
  const res = await fetch(`${baseURL}/skins`, reqConfig);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const skinIds = await res.json();
  console.log(`[updateSkins] 🔹 Trovati ${skinIds.length} IDs`);

  // Dividi in batch
  const batches = chunkArray(skinIds, BATCH_SIZE);
  console.log(`[updateSkins] 🔹 ${batches.length} batch da ${BATCH_SIZE} skins`);

  const allSkins = [];

  // Fetch batch con pool limit e log con indice corretto
  const batchResults = await asyncPool(CONCURRENT_LIMIT, batches, async (batch, index) => {
    console.log(`[updateSkins] 🔹 Fetch batch ${index + 1}/${batches.length}`);
    const skins = await fetchBatch(batch);
    console.log(`[updateSkins] ✅ Batch ${index + 1} completato, ${skins.length} skins`);

    await upsertSkinsToSupabase(skins);

    return skins;
  });

  // Flatten array dei batch
  batchResults.forEach(skins => allSkins.push(...skins));

  console.log(`[updateSkins] 🔹 Salvando ${allSkins.length} skins su file...`);
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(allSkins));
  console.log("[updateSkins] 🎉 Aggiornamento completato!");
}

updateSkins().catch(err => {
  console.error("[updateSkins] ❌ Errore:", err);
  process.exit(1);
});
