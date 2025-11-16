import fs from "fs/promises";
import path from "path";

const OUTPUT_PATH = path.join(process.cwd(), "app/lib", "items.json");

let cachedStats: any = null;

// Funzione per generare le statistiche dagli item
function getStats(items: any[]) {
  const stats = {
    totalItems: items.length,
    types: {} as Record<string, number>,
    subtypes: {} as Record<string, number>,
    rarities: {} as Record<string, number>,
    bonuses: new Set<string>(),
  };

  items.forEach(item => {
    stats.types[item.type] = (stats.types[item.type] || 0) + 1;
    if (item.details?.type) {
      stats.subtypes[item.details.type] = (stats.subtypes[item.details.type] || 0) + 1;
    }
    stats.rarities[item.rarity] = (stats.rarities[item.rarity] || 0) + 1;

    // if (Array.isArray(item.details?.infix_upgrade?.buffs)) {
    //   item.details.infix_upgrade.buffs.forEach(b => stats.bonuses.add(b.description));
    // }
  });

  // stats.bonuses = Array.from(stats.bonuses);
  return stats;
}

// Endpoint GET
export async function GET(req: Request) {
  if (!cachedStats) {
    const data = await fs.readFile(OUTPUT_PATH, "utf-8");
    const items = JSON.parse(data);
    cachedStats = getStats(items);
  }

  return new Response(JSON.stringify(cachedStats), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
