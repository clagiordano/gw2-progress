import { getToken } from "@/app/actions";
import { AnalizedProgress, Group, Progress } from "@/models/achievement";
import { analyze } from "@/services/achievements";
import { NextRequest, NextResponse } from "next/server";
import { getAchievements } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  const token = await getToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const userProgressionResp = await fetch(
      `${process.env.API_GW_BASE_URL}/account/achievements`,
      { headers }
    );

    if (!userProgressionResp.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user progression" },
        { status: userProgressionResp.status }
      );
    }

    const userProgression: Progress[] = await userProgressionResp.json();
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
