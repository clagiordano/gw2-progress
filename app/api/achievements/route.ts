import { NextResponse } from "next/server";
import rawAchievements from "@/app/lib/achievements_detailed.json";
import { Group } from "@/models/achievement";

const achievements: Group[] = rawAchievements as Group[];

export async function GET() {
  if (!achievements) {
    return NextResponse.json(
      { error: "Achievements data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(achievements);
}
