"use client";

import { useEffect, useState } from "react";
import {
  Achievement,
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
  Skeleton,
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
  const [achievementsLoading, setAchievementsLoading] = useState<
    Record<string, boolean>
  >({});
  const [userProgression, setUserProgression] = useState<Progress[]>([]);

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
    categories.forEach((cat: Category) => {
      if (cat.achievements.length === 0) return;

      // Set loading ON for this category
      setAchievementsLoading((prev) => ({ ...prev, [cat.id]: true }));

      getAchievementByIds(cat.achievements.join(",")).then((data) => {
        setAchievements((prev) => ({ ...prev, [cat.id]: data }));
        setAchievementsLoading((prev) => ({ ...prev, [cat.id]: false }));
      });
    });
  }, [categories]);

  // Derived achievements with done status (recommended by React)
  const achievementsWithDone: Record<string, Achievement[]> = Object.fromEntries(
    Object.entries(achievements).map(([cid, list]) => {
      const updated = list.map((ach) => {
        const found = userProgression.find((p) => p.id === ach.id);
        return {
          ...ach,
          done: found ? !!found.done : false,
        };
      });
      return [cid, updated];
    })
  );

  return (
    <div>
      {dailies && (
        <Heading size="lg" as="h1" mb={4}>
          <Skeleton isLoaded={!isDailiesLoading} noOfLines={1}>
            {dailies.name}: {dailies.description}
          </Skeleton>
        </Heading>
      )}

      <Skeleton isLoaded={!isCategoriesLoading}>
        {categories.map((cat) => (
          <div key={`cont_${cat.id}`}>
            <Text fontSize="2xl">
              {cat.name}: {cat.description}
            </Text>

            <Skeleton isLoaded={!achievementsLoading[cat.id]}>
              <UnorderedList mb={6}>
                {achievementsWithDone[cat.id]?.map((achi) => (
                  <ListItem key={achi.id}>
                    <ListIcon
                      as={CheckCircleIcon}
                      color={achi.done ? "green.500" : "gray.500"}
                    />
                    {achi.name}: {achi.description}
                  </ListItem>
                ))}
              </UnorderedList>
            </Skeleton>
          </div>
        ))}
      </Skeleton>
    </div>
  );
}
