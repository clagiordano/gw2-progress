"use client";

import { useEffect, useState } from "react";
import { analyze } from "@/services/achievements";
import { Group, Progress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";

export default function ProgressPage() {
  const [achievementGroups, setAchievementGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch achievements and user progression in parallel
        const [rawAchievements, userProgression] = await Promise.all([
          fetch("/api/achievements").then(res => res.json()),
          fetch("/api/user/progression").then(res => res.json())
        ]);

        console.log("Fetched raw achievements and user progression");

        // Client-side analysis
        const analyzed = await analyze(rawAchievements, userProgression);

        setAchievementGroups(analyzed.achievements);
        console.log("Analyzed achievement groups with user progression");
      } catch (err) {
        console.error("Error fetching or analyzing achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading achievements...</p>}
      <AchievementGroupWithDrawer data={achievementGroups} />
    </div>
  );
}
