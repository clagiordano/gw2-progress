import { NextResponse } from "next/server";
import itemsRaw from "@/app/lib/items.json";
import { Item } from "@/models/item";

const items: Item[] = itemsRaw as Item[];

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const item = items.find(i => i.id === id);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
