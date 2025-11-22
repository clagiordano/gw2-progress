"use client";

import { useEffect, useState } from "react";
import { Group, AnalizedProgress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";

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
      {loading && <p>Loading...</p>}
      <AchievementGroupWithDrawer data={dataToRender} />
    </div>
  );
}
