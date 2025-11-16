import { NextRequest, NextResponse } from "next/server";
import itemsRaw from "@/app/lib/items.json";
import { Item } from "@/models/item";

const items: Item[] = itemsRaw as Item[];

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  const itemId = parseInt(id, 10);

  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
};
