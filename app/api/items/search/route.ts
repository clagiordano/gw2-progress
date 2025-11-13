import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { Item } from "@/models/item";

// const items: Item[] = itemsRaw as Item[];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";
  const subtype = searchParams.get("subtype")?.toLowerCase() || "";
  const rarity = searchParams.get("rarity")?.toLowerCase() || "";
  //   const bonus = searchParams.get("bonus")?.toLowerCase() || "";

  // const results = items.filter(item => {
  //   // 1️⃣ Full text search on name
  //   const matchName =
  //     !q || item.name.toLowerCase().includes(q);

  //   // 2️⃣ Filter by item category
  //   const matchCategory =
  //     !category || item.type.toLowerCase().includes(category);

  //   // 2️⃣ Filter by item subtype
  //   const matchSubtype =
  //     !subtype || item.details?.type?.toLowerCase().includes(subtype);

  //   // // 3️⃣ Filter by rarity
  //   const matchRarity =
  //     !rarity || item.rarity.toLowerCase().includes(rarity);

  //   // // 4️⃣ Filtro bonus (array)
  //   // const matchBonus =
  //   //   !bonus ||
  //   //   (Array.isArray(item.bonuses) &&
  //   //     item.bonuses.some((b: string) =>
  //   //       b.toLowerCase().includes(bonus)
  //   //     ));

  //   // Tutte le condizioni devono essere vere
  //   return matchName && matchCategory && matchSubtype && matchRarity;
  // });

  let query = supabase.from("items").select("*").limit(200);
  if (q) query = query.ilike("data->>name", `%${q}%`);
  if (category) query = query.ilike("data->>type", `%${category}%`);
  if (subtype) query = query.ilike("data->>details->type", `%${subtype}%`);
  if (rarity) query = query.ilike("data->>rarity", `%${rarity}%`);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data || []);
}
