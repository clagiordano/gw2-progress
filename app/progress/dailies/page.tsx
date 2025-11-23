"use client";

import { useEffect, useState } from "react";
import {
  Achievement,
  Achievements,
  Category,
  Group,
  Progress,
} from "@/models/achievement";
import {
  ListItem,
  UnorderedList,
  Text,
  ListIcon,
  Heading,
  SkeletonText,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  getAchievementByIds,
  getAchievementsCategoriesByIds,
  getAchievementsGroupsById,
  getUserProgression,
} from "@/services/achievements";

export default function Dailies() {
  const [dailies, setDailies] = useState<Group | null>(null);
  const [isDailiesLoading, setDailiesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  const [achievements, setAchievements] = useState<
    Record<string, Achievement[]>
  >({});
  const [isAchievementsLoading, setAchievementsLoading] = useState(true);
  const [userProgression, setUserProgression] = useState<Progress[]>([]);
  const [isProgressionLoading, setUserProgressionLoading] = useState(true);

  useEffect(() => {
    getAchievementsGroupsById("18DB115A-8637-4290-A636-821362A3C4A8").then(
      (data) => {
        setDailies(data);
        setDailiesLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    getUserProgression().then((data) => {
      setUserProgression(data);
      setUserProgressionLoading(false);
    });
  }, []);

  useEffect(() => {
    if (dailies) {
      getAchievementsCategoriesByIds(dailies.categories.join(",")).then(
        (data) => {
          setCategories(data);
          setCategoriesLoading(false);
        }
      );
    }
  }, [dailies]);

  useEffect(() => {
    categories.map((cat: Category) => {
      if (cat.achievements.length > 0) {
        getAchievementByIds(cat.achievements.join(",")).then((data) => {
          setAchievements((act: any) => ({ ...act, [cat.id]: data }));
          setAchievementsLoading(false);
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

      achis.map((ach: Achievement) => {
        // console.log('ach.id', ach.id)
        let found: any = userProgression?.find((pro: Progress) => pro.id === ach.id);
        if (found) {
          ach.done = found?.done !== undefined ? found.done : false;
        }
      });

      setAchievements((act: any) => ({ ...act, [cid]: achis }));
    });
  }, [achievements, userProgression]);

  return (
    <div>
      {dailies && (
        <Heading size="lg" as="h1" mb={4}>
          <SkeletonText isLoaded={!isDailiesLoading} noOfLines={1}>
            {dailies.name}: {dailies.description}
          </SkeletonText>
        </Heading>
      )}

      <SkeletonText isLoaded={!isCategoriesLoading}>
        {categories &&
          categories.map((cat: Category, cid) => (
            <div key={`cont_${cid}`}>
              <Text fontSize="2xl">
                {cat.name}: {cat.description}
              </Text>

              <SkeletonText isLoaded={!isAchievementsLoading}>
                <UnorderedList key={cid} mb={6}>
                  {achievements[cat.id]?.map(
                    (achi: Achievement, aid: number) => (
                      <ListItem key={aid}>
                        <ListIcon
                          as={CheckCircleIcon}
                          color={`${achi.done ? "green" : "gray"}.500`}
                        />
                        {achi.name}: {achi.description}
                      </ListItem>
                    )
                  )}
                </UnorderedList>
              </SkeletonText>
            </div>
          ))}
      </SkeletonText>
    </div>
  );
}
