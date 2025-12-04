import { unstable_cache } from "next/cache";
import * as cheerio from "cheerio";
import { isWithinInterval, isBefore, isAfter } from "date-fns";

const getSpecialEventsCached = () =>
  unstable_cache(
    async (): Promise<any[]> => {
      const baseUrl = "https://wiki.guildwars2.com";
      const resp = await fetch(`${baseUrl}/wiki/Special_event`, {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "it-IT,it;q=0.8",
          "cache-control": "no-cache",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
          pragma: "no-cache",
          priority: "u=0, i",
          "sec-ch-ua":
            '"Chromium";v="142", "Brave";v="142", "Not_A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
          cookie: "en_wikidb_gw2mwuser-sessionId=b2049db2e61f817efbbb",
        },
        body: null,
        method: "GET",
      });

      const html = await resp.text();
      const $ = cheerio.load(html);

      const rows = $(".mech2.table > tbody > tr.line > th");
      const events = rows
        .map((_, el) => {
          const th = $(el);
          const link = th.find("a");

          const linkText = link.text().trim();
          const href = link.attr("href");
          const url = `${baseUrl}${href}`;
          const title = link.attr("title") || linkText;

          const timeframeText = th
            .clone()
            .children("a, small, span")
            .remove()
            .end()
            .text()
            .trim();

          const mode = th.find("span").text().trim();

          const cleaned = timeframeText.replace(/^:\s*/, "").trim();
          const [startStr, endStr] = cleaned.split("—").map((s) => s.trim());

          const startDate = new Date(startStr); // ok
          const endDate = new Date(endStr); // ok

          const status = (() => {
            const now = new Date();
            if (isWithinInterval(now, { start: startDate, end: endDate }))
              return "active";
            if (isBefore(now, startDate)) return "upcoming";
            if (isAfter(now, endDate)) return "ended";
            return "unknown";
          })();

          const duration = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            url,
            title,
            start: startDate,
            end: endDate,
            status,
            duration,
            mode,
          };
        })
        .get();
      return events;
    },
    ["special-events"], // base key
    { revalidate: 1, tags: ["special-events"] } // TTL + tag
  )();

export async function getSpecialEvents(): Promise<any[]> {
  return getSpecialEventsCached();
}
