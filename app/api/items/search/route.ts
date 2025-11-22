import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";
  const subtype = searchParams.get("subtype")?.toLowerCase() || "";
  const rarity = searchParams.get("rarity")?.toLowerCase() || "";
  const bonuses = searchParams.get("bonuses")?.toLowerCase() || "";

  let query = supabase.from("items").select("*").limit(200);
  if (q) query = query.ilike("data->>name", `%${q}%`);
  if (category) query = query.ilike("data->>type", `%${category}%`);
  if (subtype) query = query.ilike("data->details->>type", `%${subtype}%`);
  if (rarity) query = query.ilike("data->>rarity", `%${rarity}%`);
  if (bonuses) query = query.ilike("data->details->>bonuses", `%${bonuses}%`);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data || []);
}
