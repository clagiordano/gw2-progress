"use server";

import { getToken } from "@/app/actions";
import { Achievement, AnalizedProgress, Category, Group, Progress, Tier } from "@/models/achievement";
import { unstable_cache } from "next/cache";

const baseOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  // next: { revalidate: 3600 },
};

// export const getLocalAchievements = async () => {
// 	const achievements: any = await fsPromises.readFile(path.join(process.cwd(), 'data/achievements.json'));
// 	return await JSON.parse(achievements);
// }

// import fsPromises from "fs/promises";
// import path from "path";
// export async function getLocalAchievements() {
//   console.log("started getLocalAchievements");
//   const start = Math.floor(Date.now() / 1000);
//   const filePath = path.join(process.cwd(), "data/achievements_detailed.json");
//   const jsonData: any = await fsPromises.readFile(filePath);
//   const objectData = JSON.parse(jsonData);

//   console.log("completed getLocalAchievements in ", Math.floor(Date.now() / 1000) - start);
//   return objectData;
// }

// export const getAchievements = async () => {
//   const achievements = await getAchievementsGroups();
//   // console.log('achievements', achievements.length, achievements);

//   for (const idx in achievements) {
//     // console.log('fetching ', achievements[idx]);
//     /**
//      * Populate groups
//      */
//     achievements[idx] = await getAchievementsGroupsById(achievements[idx]);
//     // console.log('achievements[idx]', achievements[idx]);

//     /**
//      * Populate categories
//      */
//     if (
//       achievements[idx].categories &&
//       achievements[idx].categories.constructor === Array
//     ) {
//       achievements[idx].categories = await getAchievementsCategoryById(
//         achievements[idx].categories.join(",")
//       );
//     }

//     /**
//      * Populate achievements
//      */
//     for (const cId in achievements[idx].categories) {
//       achievements[idx].categories[cId].achievements = await getAchievementById(
//         achievements[idx].categories[cId].achievements.join(",")
//       );
//     }
//   }

//   return achievements;
// };

// User based caching for user progression data with 5 minutes TTL
const getUserProgressionCached = unstable_cache(
  async (token: string): Promise<Progress[]> => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const resp = await fetch(
      `${process.env.API_GW_BASE_URL}/account/achievements`,
      { headers }
    );

    if (!resp.ok) return [];
    return await resp.json();
  },
  ["user-progression"], // base key
  { revalidate: 300, tags: ["user-progression"] } // TTL + tag
);

export async function getUserProgression(): Promise<Progress[]> {
  const token = await getToken();
  return getUserProgressionCached(token);
}

export async function getAchievementsGroups(): Promise<Group[]> {
  const resp = await fetch(
    `${process.env.API_GW_BASE_URL}/achievements/groups`,
    baseOptions
  );

  if (!resp.ok) {
    return [];
  }

  return await resp.json();
}

export async function getAchievementsGroupsById(groupId: number | string): Promise<Group | null> {
  const resp = await fetch(
    `${process.env.API_GW_BASE_URL}/achievements/groups/${groupId}`,
    baseOptions
  );

  if (!resp.ok) {
    return null;
  }

  return await resp.json();
}

export async function getAchievementsCategoriesByIds(cId: number | string): Promise<Category[]> {
  const resp = await fetch(
    `${process.env.API_GW_BASE_URL}/achievements/categories?ids=${cId}`,
    baseOptions
  );

  if (!resp.ok) {
    return [];
  }

  return await resp.json();
}

export async function getAchievementByIds(aId: number | string): Promise<Achievement[]> {
  if (!aId) {
    /**
     * On emprty aId directly returns an empty array to avoid useless api calls
     */
    return [];
  }
  const resp = await fetch(
    `${process.env.API_GW_BASE_URL}/achievements?ids=${aId}`,
    baseOptions
  );

  if (!resp.ok) {
    return [];
  }

  return await resp.json();
}

// Memoized function
export const getAchievements = async () => {
  const achievementsModule = await import("@/app/lib/achievements_detailed.json");
  return achievementsModule.default as Group[];
};

/**
 * Iterate through any achievements group and calculate total and user points
 * @param achievements
 * @param progression
 * @returns
 */
export const analyze = async (achievements: Group[], progression: Progress[]): Promise<AnalizedProgress> => {
  let start = Math.floor(Date.now() / 1000);
  console.log(
    `completed fetch local achievements in ${
      Math.floor(Date.now() / 1000) - start
    }`
  );

  let tPts = 0;
  let utPts = 0;

  start = Math.floor(Date.now() / 1000);
  if (achievements && achievements.constructor === Array) {
    achievements.map((group: Group) => {
      let gPts = 0;
      let ugPts = 0;

      group.gPts = 0;
      group.ugPts = 0;

      if (group.categories && group.categories.constructor === Array) {
        group.categories.map((cat: Category) => {
          let cPts = 0;
          let ucPts = 0;

          cat.cPts = 0;
          cat.ucPts = 0;

          if (!cat.achievements || cat.achievements.constructor !== Array) {
            console.warn(
              `Invalid achievements data for ${cat.name}, expected array`
            );
            return;
          }

          cat.achievements.map((ach: Achievement) => {
            let aPts = ach.tiers.reduce(
              (aPts: number, t: Tier) => t.points + aPts,
              0
            );
            let uaPts = 0;

            if (progression && progression.constructor === Array) {
              let fIdx = progression.findIndex(
                (a: Progress) => a.id == ach.id
              );

              if (fIdx !== -1) {
                let uach = progression[fIdx];
                let current = uach.current ?? 0;
                ach.done = uach.done ?? false;
                progression.splice(fIdx, 1);
                uaPts = ach.tiers
                  .filter((t: Tier) => t.count <= current)
                  .reduce((uaPts: number, t: Tier) => t.points + uaPts, 0);

                if (uach.repeated) {
                  /** Include repeated times */
                  let uaPtsRepeated = aPts * uach.repeated;
                  if (uaPtsRepeated > ach.point_cap) {
                    uaPtsRepeated = ach.point_cap;
                  }
                  uaPts = uaPts + uaPtsRepeated;
                }
              }
            }

            if (ach.point_cap && ach.point_cap > 0) {
              /**
               * For repeatable achievements use point_cap as maximum earnable amount
               * -1 means infinite
               */
              //console.log('override aPts', aPts, '->', ach.point_cap);
              aPts = ach.point_cap;
            }

            ach.aPts = aPts;
            ach.uaPts = uaPts;

            // console.log(` -> ${ach.name}: ${uaPts} / ${aPts}`);
            cPts = cPts + aPts;
            ucPts = ucPts + uaPts;

            cat.cPts = cPts;
            cat.ucPts = ucPts;

            cat.cPtsPercent = Math.round((ucPts / (cPts || 1)) * 100);
          });

          //console.log(`  \u21B3 ${cat.name}: ${ucPts} / ${cPts}`);
          gPts = gPts + cPts;
          ugPts = ugPts + ucPts;
        });
      }

      group.gPts = gPts;
      group.ugPts = ugPts;

      tPts = tPts + gPts;
      utPts = utPts + ugPts;
      // console.log(`${group.name} group points: ${ugPts} / ${gPts}`);
      //console.log(sprintf("%25s: %5d / %5d (%3d%%)", `${group.name}`, ugPts, gPts, ((ugPts / (gPts || 1)) * 100)));

      group.gPtsPercent = Math.round((ugPts / (gPts || 1)) * 100);
    });
  }

  return {
    achievements: structuredClone(achievements),
    totalPoints: tPts,
    userTotalPoints: utPts,
    totalPercent: Math.round((utPts / (tPts || 1)) * 100),
  };
};
