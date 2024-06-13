"use client";

import { Suspense, useEffect, useState } from "react";
import {
  getAchievementById,
  getAchievementsCategoryById,
  getAchievementsGroupsById,
  getUserProgression,
} from "@/services/achievements";
import {
  IAchievement,
  ICategory,
  IGroup,
  IProgress,
} from "@/models/IAchievements";
import { ListItem, UnorderedList, Text, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

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
  const [progression, setProgression] = useState<[]>();

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
    // console.log("progress init");
    getUserProgression().then((data) => {
      // console.log("fetched progression data", data);
      setProgression(
        data.concat([
          {
            id: 6775,
            current: 1,
            max: 1,
            done: true,
          },
        ])
      );
    });
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
    // console.log("categories changed", categories);

    categories.map((cat: ICategory) => {
      if (cat.achievements.length > 0) {
        getAchievementById(cat.achievements.join(",")).then((data) => {
          // console.log("fetched achievements", data);
          setAchievements((act: any) => ({ ...act, [cat.id]: data }));
        });
      }
    });
  }, [categories]);

  useEffect(() => {
    // console.log("progression changed", progression);
    // console.log("achievements changed", achievements);

    Object.entries(achievements).map(([cid, achis]) => {
      // console.log('cid', cid);
      // console.log('achis', achis);

      achis.map((ach: IAchievement) => {
        // console.log('ach.id', ach.id)
        let found: IProgress = progression?.find((pro: IProgress) => pro.id === ach.id);
        if (found) {
          // console.log("found", found);
          ach.done = found.done;
        }
      });

      setAchievements((act: any) => ({ ...act, [cid]: achis }));
    });
  }, [achievements, progression]);

  return (
    <div>
      {/* <Suspense fallback="Loading..."> */}
      <h2>
        {group.name}: {group.description}
      </h2>

      {categories.map((cat: ICategory, cid) => (
        <div key={`cont_${cid}`}>
          <Text fontSize="2xl">
            {cat.name}: {cat.description}
          </Text>

          <UnorderedList key={cid}>
            {achievements[cat.id]?.map((achi: IAchievement, aid: string) => (
              <ListItem key={aid}>
                <ListIcon as={CheckCircleIcon} color={`${achi.done ? 'green' : 'gray'}.500`} />
                ({achi.id}) {achi.name}: {achi.description}
              </ListItem>
            ))}
          </UnorderedList>
        </div>
      ))}
      {/* </Suspense> */}
    </div>
  );
}
