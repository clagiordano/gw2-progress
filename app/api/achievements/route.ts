import { NextResponse } from "next/server";
import { getAchievements } from "@/services/achievements";


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
