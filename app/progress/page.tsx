"use client";

import { useEffect, useState, useMemo } from "react";
import { Group, AnalizedProgress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";
import { Divider, Box, Input, HStack, Checkbox, Text } from "@chakra-ui/react";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressLegend } from "@/components/ProgressLegend";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [analyzed, setAnalyzed] = useState<AnalizedProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchText, setSearchText] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterUncompleted, setFilterUncompleted] = useState(false);

  // Load raw achievements
  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        setRawAchievementGroups(data);
      });
  }, []);

  // Load analyzed progression
  useEffect(() => {
    fetch("/api/user/progression")
      .then((res) => res.json())
      .then((data) => setAnalyzed(data))
      .finally(() => setLoading(false));
  }, []);

  // Base data
  const baseData = analyzed?.achievements ?? rawAchievementGroups;

  // ---- FILTERING LOGIC ----
  const filteredData = useMemo(() => {
    if (!baseData) return [];

    return baseData
      .map((group) => {
        const filteredCategories = group.categories.map((cat) => {
          const filteredAchievements = cat.achievements.filter((achievement) => {
            const nameMatch = achievement.name
              .toLowerCase()
              .includes(searchText.toLowerCase());

            const done = achievement.done === true;

            const completedMatch = filterCompleted ? done : true;
            const uncompletedMatch = filterUncompleted ? !done : true;

            return nameMatch && completedMatch && uncompletedMatch;
          });

          return { ...cat, achievements: filteredAchievements };
        });

        return { ...group, categories: filteredCategories };
      })
      .filter((group) =>
        group.categories.some((cat) => cat.achievements.length > 0)
      );
  }, [baseData, searchText, filterCompleted, filterUncompleted]);

  return (
    <div>
      <ProgressBar
        percentage={analyzed?.totalPercent ?? 0}
        label="Overall completion"
        currentPoints={analyzed?.userTotalPoints ?? (loading ? null : 0)}
        totalPoints={analyzed?.totalPoints ?? 0}
      />

      <Divider my={4} />

      <ProgressLegend />

      <Divider my={4} />

      {/* SEARCH + FILTER BAR */}
      <Box mb={4}>
        <Input
          placeholder="Search achievements..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          mb={3}
        />

        <HStack spacing={4}>
          <Checkbox
            isChecked={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.checked)}
          >
            Completed only
          </Checkbox>

          <Checkbox
            isChecked={filterUncompleted}
            onChange={(e) => setFilterUncompleted(e.target.checked)}
          >
            Uncompleted only
          </Checkbox>
        </HStack>
      </Box>

      <AchievementGroupWithDrawer data={filteredData} />
    </div>
  );
}
