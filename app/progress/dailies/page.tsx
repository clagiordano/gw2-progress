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
  const [achievements, setAchievements] = useState([]);

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
        console.log('fetched categories', group.categories.join(","), data);
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
            cat.achievements = data;
          });
        }
      });
  }, [categories]);

  return (
    <div>
      <h2>
        <Suspense fallback="Loading...">
          {group.name}: {group.description}
          {categories.map((cat: ICategory) => (
            <div key={cat.id}>-- CAT: {cat.name}
              {cat.achievements.map((achi: IAchievement) => {
                return (<div key={achi.id}> -- + ACHI: {achi.name}</div>)
              })}
            </div>
          ))}

        </Suspense>
      </h2>
    </div>
  );
}
