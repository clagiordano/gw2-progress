"use client";

import { Divider, Image, Box, Progress as ProgressBar } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { ProgressStats } from "./ProgressStats";
import { ProgressDetails } from "./ProgressDetails";
import {
  AnalizedProgress,
  analyze,
  getLocalAchievements,
  getUserProgression,
} from "@/services/achievements";
import { IGroup } from "@/models/IAchievements";
import { getColor } from "@/services/utils";

export default function Progress() {
  const [progress, setProgress] = useState([] as IGroup[]);
  const [progression, setProgression] = useState([]);
  const [overallProgression, setOverallProgression] = useState(
    {} as AnalizedProgress
  );

  useEffect(() => {
    getUserProgression().then((data) => {
      setProgression(data);
      console.log("set fetched progression data");
    });
  }, []);

  useEffect(() => {
    analyze(progression).then((data: AnalizedProgress) => {
      setProgress(data.achievements);
      setOverallProgression(data);
      console.log("set analyzed progress data");
    });
  }, [progression]);

  return (
    <div>
      <>
        <Box as="span" flex="1" textAlign="left">
          Overall Completion Stats {overallProgression.totalPercent}% (
          {overallProgression.userTotalPoints} /{" "}
          {overallProgression.totalPoints})
          <ProgressBar
            value={overallProgression.totalPercent}
            colorScheme={getColor(overallProgression.totalPercent)}
          />
        </Box>
      </>

      <Divider />

      {/* <ProgressDetails data={progress} /> */}
      {/* <Suspense fallback="Loading details...">
        <ProgressDetails data={progress} />
      </Suspense> */}
    </div>
  );
}
