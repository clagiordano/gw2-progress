"use client";

import { useEffect, useState } from "react";
import { Group, Achievement, AnalizedProgress, Bit, Reward } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";
import { Divider, Box, Text, Input, Spinner } from "@chakra-ui/react";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressLegend } from "@/components/ProgressLegend";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [analyzed, setAnalyzed] = useState<AnalizedProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredData, setFilteredData] = useState<Group[]>([]);

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

  // Render raw first, then analyzed once available
  const dataToRender = analyzed?.achievements ?? rawAchievementGroups;

  // Initialize filteredData on first load or updates
  useEffect(() => {
    setFilteredData(dataToRender);
  }, [dataToRender]);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Match helper: searches inside achievement fields AND rewards/bits
  const matchesQuery = (ach: Achievement, query: string): boolean => {
    const q = query.toLowerCase();

    if (
      ach.name.toLowerCase().includes(q) ||
      ach.description?.toLowerCase().includes(q) ||
      ach.requirement?.toLowerCase().includes(q)
    ) return true;

    // Search within objectives
    if (ach.bits) {
      for (const bit of ach.bits) {
        if (matchesBit(bit, q)) return true;
      }
    }

    // Search within rewards
    if (ach.rewards) {
      for (const reward of ach.rewards) {
        if (matchesReward(reward, q)) return true;
      }
    }

    return false;
  };

  const matchesBit = (bit: Bit, q: string): boolean => {
    if (bit.text && bit.text.toLowerCase().includes(q)) return true;
    if (bit.item?.name?.toLowerCase().includes(q)) return true;
    if (bit.skin?.name?.toLowerCase().includes(q)) return true;
    if (bit.minipet?.name?.toLowerCase().includes(q)) return true;
    return false;
  };

  const matchesReward = (reward: Reward, q: string): boolean => {
    if (reward.item?.name?.toLowerCase().includes(q)) return true;
    return false;
  };

  // Filtering logic
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setFilteredData(dataToRender);
      setIsFiltering(false);
      return;
    }

    setIsFiltering(true);

    const q = debouncedQuery.toLowerCase();

    const filtered = dataToRender
      .map((group) => ({
        ...group,
        categories: group.categories.map((cat) => ({
          ...cat,
          achievements: cat.achievements.filter((ach) =>
            matchesQuery(ach, q)
          ),
        })),
      }))
      .filter((group) =>
        group.categories.some((cat) => cat.achievements.length > 0)
      );

    setFilteredData(filtered);
    setIsFiltering(false);
  }, [debouncedQuery, dataToRender]);

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

      {/* Search bar */}
      <Box mb={4}>
        <Input
          placeholder="Search using name, description, requirements, objectives, rewards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isFiltering && (
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm" opacity={0.7}>Filtering…</Text>
          </Box>
        )}
      </Box>

      <AchievementGroupWithDrawer data={filteredData} />
    </div>
  );
}
