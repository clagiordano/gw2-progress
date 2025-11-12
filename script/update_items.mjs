import fs from "fs/promises";
import path from "path";
import "dotenv/config";

const baseURL = "https://api.guildwars2.com/v2";
const reqConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.ANET_ACCESS_TOKEN}`,
  },
};

const OUTPUT_PATH = path.join(process.cwd(), "data", "items.json");

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
  const url = `${baseURL}/items?ids=${ids.join(",")}&lang=en`;
  return fetchWithRetry(url);
}

// Async pool con indice corretto
async function asyncPool(poolLimit, array, iteratorFn) {
  const results = [];
  const executing = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const p = Promise.resolve().then(() => iteratorFn(item, i));
    results.push(p);

    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);

    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

async function updateItems() {
  console.log("[updateItems] 🚀 Fetch lista ID...");
  const res = await fetch(`${baseURL}/items`, reqConfig);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const itemIds = await res.json();
  console.log(`[updateItems] 🔹 Trovati ${itemIds.length} IDs`);

  // Dividi in batch
  const batches = chunkArray(itemIds, BATCH_SIZE);
  console.log(`[updateItems] 🔹 ${batches.length} batch da ${BATCH_SIZE} items`);

  const allItems = [];

  // Fetch batch con pool limit e log con indice corretto
  const batchResults = await asyncPool(CONCURRENT_LIMIT, batches, async (batch, index) => {
    console.log(`[updateItems] 🔹 Fetch batch ${index + 1}/${batches.length}`);
    const items = await fetchBatch(batch);
    console.log(`[updateItems] ✅ Batch ${index + 1} completato, ${items.length} items`);
    return items;
  });

  // Flatten array dei batch
  batchResults.forEach(items => allItems.push(...items));

  console.log(`[updateItems] 🔹 Salvando ${allItems.length} items su file...`);
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(allItems, null, 2));
  console.log("[updateItems] 🎉 Aggiornamento completato!");
}

updateItems().catch(err => {
  console.error("[updateItems] ❌ Errore:", err);
  process.exit(1);
});
