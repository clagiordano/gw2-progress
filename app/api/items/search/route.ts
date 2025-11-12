import { NextResponse } from "next/server";
import items from "@/app/lib/items.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const type = searchParams.get("type")?.toLowerCase() || "";
  const rarity = searchParams.get("rarity")?.toLowerCase() || "";
  const bonus = searchParams.get("bonus")?.toLowerCase() || "";

  const results = items.filter(item => {
    // 1️⃣ Ricerca testuale su nome
    const matchName =
      !q || item.name.toLowerCase().includes(q);

    // 2️⃣ Filtro tipo
    const matchType =
      !type || item.type.toLowerCase().includes(type);

    // 3️⃣ Filtro rarità
    const matchRarity =
      !rarity || item.rarity.toLowerCase().includes(rarity);

    // 4️⃣ Filtro bonus (array)
    const matchBonus =
      !bonus ||
      (Array.isArray(item.bonuses) &&
        item.bonuses.some((b: string) =>
          b.toLowerCase().includes(bonus)
        ));

    // Tutte le condizioni devono essere vere
    return matchName && matchType && matchRarity && matchBonus;
  });

  return NextResponse.json(results);
}
