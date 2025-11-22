import { NextResponse } from "next/server";
import { Group } from "@/models/achievement";
import { unstable_cache } from "next/cache";

// Memoized function
const getAchievements = unstable_cache(
  async () => {
    const achievementsModule = await import("@/app/lib/achievements_detailed.json");
    return achievementsModule.default as Group[];
  },
  ["achievements"],          // Cache key
  { tags: ["achievements"] } // Allow revalidation by tag
);

export async function GET() {
  try {
    const achievements = await getAchievements();
    return NextResponse.json(achievements);
  } catch (error: any) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements", details: error?.message || "unknown" },
      { status: 500 }
    );
  }
}
