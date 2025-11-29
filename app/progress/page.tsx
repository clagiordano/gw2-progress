"use client";

import { useEffect, useState } from "react";
import {
  Group,
  Achievement,
  AnalizedProgress,
  Bit,
  Reward,
} from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";
import {
  Divider,
  Box,
  Text,
  Input,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressLegend } from "@/components/ProgressLegend";
import { useAccount } from "../context/AccountContext";
import { useTransition, useMemo } from "react";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [analyzed, setAnalyzed] = useState<AnalizedProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredData, setFilteredData] = useState<Group[]>([]);

  const account = useAccount();
  const [isPending, startTransition] = useTransition();

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
    )
      return true;

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
      startTransition(() => {
        setFilteredData(dataToRender);
        setIsFiltering(false);
      });
      return;
    }

    startTransition(() => {
      const q = debouncedQuery.toLowerCase();
      const filtered = dataToRender
        .map((group) => {
          const categories = group.categories
            .map((cat) => ({
              ...cat,
              achievements: cat.achievements.filter((ach) =>
                matchesQuery(ach, q)
              ),
            }))
            .filter((cat) => cat.achievements.length > 0);

          return { ...group, categories };
        })
        .filter((group) => group.categories.length > 0);

      setFilteredData(filtered);
      setIsFiltering(false);
    });
  }, [debouncedQuery, dataToRender]);

  const volatileTotalAP =
    (account?.account?.daily_ap ?? 0) + (account?.account?.monthly_ap ?? 0);
  const grandTotal = (analyzed?.userTotalPoints ?? 0) + volatileTotalAP;
  const memoizedData = useMemo(() => filteredData, [filteredData]);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {/* Fixed position for overall progress and search section */}
      <Box flexShrink={0} pb={4}>
        <ProgressBar
          percentage={analyzed?.totalPercent ?? 0}
          label={`Overall completion - Total: ${grandTotal}, Daily: ${account?.account?.daily_ap}, Monthly: ${account?.account?.monthly_ap}`}
          currentPoints={loading ? null : analyzed?.userTotalPoints ?? 0}
          totalPoints={analyzed?.totalPoints ?? 0}
        />

        <Divider my={4} />
        <ProgressLegend />
        <Divider my={4} />

        {/* Search bar */}
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Search using name, description, requirements, objectives, rewards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement>
              <Spinner
                size="sm"
                opacity={isPending || isFiltering ? 1 : 0}
                transition="opacity 0.2s"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>

      {/* Scrollable section */}
      <Box flex="1" minH={0} overflowY="auto" pr={2}>
        <AchievementGroupWithDrawer data={memoizedData} />
      </Box>
    </Box>
  );
}
