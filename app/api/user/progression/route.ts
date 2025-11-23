import { AnalizedProgress, Group, Progress } from "@/models/achievement";
import { analyze, getUserProgression } from "@/services/achievements";
import { NextRequest, NextResponse } from "next/server";
import { getAchievements } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    const userProgression: Progress[] = await getUserProgression();
    const achievements: Group[] = await getAchievements();

    const analizedProgress: AnalizedProgress = await analyze(
      achievements,
      userProgression
    );
    return NextResponse.json(analizedProgress);
  } catch (error) {
    console.error("Error calculating user progression", error);
    return NextResponse.json(
      { error: "Error calculating user progression", details: error },
      { status: 500 }
    );
  }
};
