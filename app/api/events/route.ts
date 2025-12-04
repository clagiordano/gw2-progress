import { getSpecialEvents } from "@/services/events";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const events = await getSpecialEvents();
    return NextResponse.json(events);
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error?.message || "unknown" },
      { status: 500 }
    );
  }
};
