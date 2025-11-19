// /app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"

const ALLOWED_TAGS = new Set([
  "items-stats",
])

export async function POST(req: Request) {
  const body = await req.json()
  const { secret, tags } = body

  // 1. Check secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 })
  }

  // 2. Normalize tags
  let tagsList: string[] = []

  if (typeof tags === "string") {
    tagsList = [tags]
  } else if (Array.isArray(tags)) {
    tagsList = tags
  } else {
    return new Response("Missing or invalid 'tags'", { status: 400 })
  }

  // 3. Validate tags against whitelist
  const invalid = tagsList.filter(t => !ALLOWED_TAGS.has(t))
  if (invalid.length > 0) {
    return new Response(
      `Invalid tags: ${invalid.join(", ")}`,
      { status: 400 }
    )
  }

  // 4. Revalidate multiple tags
  for (const tag of tagsList) {
    await revalidateTag(tag, { expire: 0 })
  }

  return Response.json({
    revalidated: true,
    count: tagsList.length,
    tags: tagsList
  })
}
