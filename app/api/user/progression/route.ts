import { getToken } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  let token = searchParams.get("token");

  if (!token) {
    token = await getToken();
    // return NextResponse.json(
    //   { error: "No access token available" },
    //   { status: 401 }
    // );
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const resp = await fetch(
      `${process.env.API_GW_BASE_URL}/account/achievements`,
      { headers }
    );

    if (resp.ok) {
      const data = await resp.json();
      return NextResponse.json(data);
    } else {
      console.error(
        "Failed to fetch user progression",
        resp.ok,
        resp.status,
        resp.statusText
      );
      return NextResponse.json(
        { error: "Failed to fetch user progression" },
        { status: resp.status }
      );
    }
  } catch (error) {
    console.error("Error fetching user progression", error);
    return NextResponse.json(
      { error: "Error fetching user progression" },
      { status: 500 }
    );
  }
};
