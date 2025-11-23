"use client";

import { useEffect, useState } from "react";
import { Group, AnalizedProgress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";
import { Divider, Progress, Box, Text,  } from "@chakra-ui/react";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressLegend } from "@/components/ProgressLegend";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [analyzed, setAnalyzed] = useState<AnalizedProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Load raw achievements first (instant thanks to server cache)
  useEffect(() => {
    fetch("/api/achievements")
      .then(res => res.json())
      .then(data => {
        setRawAchievementGroups(data);
        console.log("Fetched raw achievement groups");
      });
  }, []);

  // Load analyzed progression (can take some seconds server-side)
  useEffect(() => {
    fetch("/api/user/progression")
      .then(res => res.json())
      .then(data => {
        setAnalyzed(data);
        console.log("Fetched analyzed progression");
      })
      .finally(() => setLoading(false));
  }, []);

  // Render raw first, then replace with analyzed
  const dataToRender = analyzed?.achievements ?? rawAchievementGroups;

  return (
    <div>

      <ProgressBar
        percentage={analyzed?.totalPercent ?? 0}
        label="Overall completion"
        currentPoints={analyzed?.userTotalPoints ?? loading ? null : 0}
        totalPoints={analyzed?.totalPoints ?? 0}
      />
      <Divider my={4} />

      <ProgressLegend />

      <Divider my={4} />
      <AchievementGroupWithDrawer data={dataToRender} />
    </div>
  );
}
