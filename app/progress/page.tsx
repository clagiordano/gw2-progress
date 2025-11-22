"use client";

import { useEffect, useState } from "react";
import { analyze } from "@/services/achievements";
import { Group, Progress, AnalizedProgress } from "@/models/achievement";
import { AchievementGroupWithDrawer } from "@/components/AchievementGroupWithDrawer";

export default function ProgressPage() {
  const [rawAchievementGroups, setRawAchievementGroups] = useState<Group[]>([]);
  const [userProgression, setUserProgression] = useState<Progress[]>([]);
  const [achievementGroups, setAchievementGroups] = useState<Group[]>([]);

  useEffect(() => {
    /**
     * Fetch raw achievements data
     */
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {setRawAchievementGroups(data); console.log("fetched raw achievement groups")});
  }, []);

  useEffect(() => {
    /**
     * Fetch user progression data
     */
    fetch("/api/user/progression")
      .then((res) => res.json())
      .then((data) => {setUserProgression(data); console.log("fetched user progression")});
  }, []);

  useEffect(() => {
    if (rawAchievementGroups.length === 0 || userProgression.length === 0)
      return;

    analyze(rawAchievementGroups, userProgression).then((data) => {
      setAchievementGroups(data.achievements);
      console.log("analyzed achievement groups with user progression");
    });
  }, [rawAchievementGroups, userProgression]);

  // const [progress, setProgress] = useState([] as Group[]);
  // const [progression, setProgression] = useState([]);
  // const [overallProgression, setOverallProgression] = useState(
  //   {} as AnalizedProgress
  // );

  // useEffect(() => {
  //   getUserProgression().then((data) => {
  //     setProgression(data);
  //     console.log("set fetched progression data");
  //   });
  // }, []);

  // useEffect(() => {
  //   analyze(progression).then((data: AnalizedProgress) => {
  //     setProgress(data.achievements);
  //     setOverallProgression(data);
  //     console.log("set analyzed progress data");
  //   });
  // }, [progression]);

  return (
    <div>
      <AchievementGroupWithDrawer data={achievementGroups.length ? achievementGroups : rawAchievementGroups} />
      {/* <Accordion allowToggle>
        {achievementGroups.map((group: Group) => (
          <AchievementGroup key={group.id} group={group} />
        ))}
      </Accordion> */}
    </div>
  );
}
