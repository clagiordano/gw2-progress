"use client";

import { Suspense, useEffect, useState } from "react";
import {
  getAchievementById,
  getAchievementsCategoryById,
  getAchievementsGroupsById,
} from "@/services/achievements";
import { IAchievement, ICategory, IGroup } from "@/models/IAchievements";

export default function Dailies() {
  const [group, setGroup] = useState<IGroup>({
    id: "",
    name: "",
    description: "",
    order: 1,
    categories: [],
    gPtsPercent: 0,
    ugPts: 0,
    gPts: 0,
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [achievements, setAchievements] = useState<object>({});

  useEffect(() => {
    // console.log("group init");
    getAchievementsGroupsById("18DB115A-8637-4290-A636-821362A3C4A8").then(
      (data) => {
        // console.log('fetched group data', data);
        setGroup(data);
      }
    );
  }, []);

  useEffect(() => {
    // console.log("group changed", group);

    if (group.categories.length > 0) {
      getAchievementsCategoryById(group.categories.join(",")).then((data) => {
        // console.log('fetched categories', group.categories.join(","), data);
        setCategories(data);
      });
    }
  }, [group]);

  useEffect(() => {
    console.log("categories changed", categories);

      categories.map((cat: ICategory) => {
        if (cat.achievements.length > 0) {
          getAchievementById(cat.achievements.join(",")).then((data) => {
            console.log("fetched achievements", data);
            // cat.achievements = data;
            // setCategories(categories);

            // setCategories([...categories, {...cat, achievements: data}])

            // setAchievements({...achievements, [cat.id]: data});

            setAchievements((act: any) => ({...act, [cat.id]: data}))
          });
        }
      });
  }, [categories]);

  useEffect(() => {
    console.log("achievements changed", achievements);

  }, [achievements]);

  return (
    <div>
      <Suspense fallback="Loading...">
        <h2>
          {group.name}: {group.description}
        </h2>

        {categories.map((cat: ICategory, cid) => (
          <ul key={cid}>
            -- CAT: {cat.name}
            {achievements[cat.id]?.map((achi: IAchievement, aid: number) => (

                <li key={aid}> -- + ACHI: {achi.name}</li>
              ))

            }
          </ul>
        ))}
      </Suspense>
    </div>
  );
}
