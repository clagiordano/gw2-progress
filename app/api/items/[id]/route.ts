import { NextResponse } from "next/server";
import items from "@/app/lib/items.json";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const item = items.find(i => i.id === id);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
