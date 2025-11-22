"use client";

import { useEffect, useState } from "react";
import { analyze } from "@/services/achievements";
import { Group, Progress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [userProgression, setUserProgression] = useState<Progress[]>([]);
  const [achievementGroups, setAchievementGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch raw achievements
  useEffect(() => {
    fetch("/api/achievements")
      .then(res => res.json())
      .then(data => {
        setRawAchievementGroups(data);
        console.log("Fetched raw achievement groups");
      });
  }, []);

  // Fetch user progression
  useEffect(() => {
    fetch("/api/user/progression")
      .then(res => res.json())
      .then(data => {
        setUserProgression(data);
        console.log("Fetched user progression");
      });
  }, []);

  // Analyze achievements once both raw data and progression are loaded
  useEffect(() => {
    if (rawAchievementGroups.length === 0 || userProgression.length === 0) return;

    // Perform analysis **client-side** to avoid large server payloads
    (async () => {
      setLoading(true);

      try {
        const analyzed = await analyze(rawAchievementGroups, userProgression);
        setAchievementGroups(analyzed.achievements);
        console.log("Analyzed achievement groups with user progression");
      } catch (err) {
        console.error("Error analyzing achievements", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [rawAchievementGroups, userProgression]);

  // Decide which data to render: raw first, analyzed later
  const dataToRender = achievementGroups.length ? achievementGroups : rawAchievementGroups;

  return (
    <div>
      {loading && <p>Loading...</p>}
      <AchievementGroupWithDrawer data={dataToRender} />
    </div>
  );
}
