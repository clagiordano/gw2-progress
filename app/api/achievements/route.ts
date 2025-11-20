import { NextResponse } from "next/server";
import achievements from "@/app/lib/achievements.json";

export async function GET() {
  if (!achievements) {
    return NextResponse.json(
      { error: "Achievements data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(achievements);
}
