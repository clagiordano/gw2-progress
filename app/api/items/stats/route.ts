import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { unstable_cache } from "next/cache";
import { rarityOrder } from "@/app/lib/itemHelper";

// sort rarities according to rarityOrder
const sortRarities = (data: any[]) => {
  return data.map((typeGroup: any) => ({
    ...typeGroup,
    subtypes: typeGroup.subtypes.map((sub: any) => ({
      ...sub,
      rarities: sub.rarities.sort(
        (a: any, b: any) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      ),
    })),
  }));
};

const getStats = unstable_cache(
  async () => {
    const { data, error } = await supabase.rpc("items_grouped");
    if (error) throw new Error(error.message);
    return sortRarities(data); // Ordina subito
  },
  ["items-stats"],          // Cache tag
  { tags: ["items-stats"] } // Allow revalidation by tag
);

export async function GET() {
  try {
    const data = await getStats();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
