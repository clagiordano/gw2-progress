"use client";

import { Box, Text, Progress, useTheme, useColorModeValue } from "@chakra-ui/react";
import { getProgressIndex } from "@/services/utils";

interface ProgressBarProps {
  percentage: number;
  label: string;
  currentPoints: number | null;
  totalPoints: number | null;
}

export const ProgressBar = ({
  percentage = 0,
  label = "N/A",
  currentPoints = null,
  totalPoints = null,
}: ProgressBarProps) => {
  const theme = useTheme();
  const level = getProgressIndex(percentage);

  // Usa light/dark color
  const barColor = useColorModeValue(
    theme.colors.progressColors[level]?.light ?? "#3182ce",
    theme.colors.progressColors[level]?.dark ?? "#3182ce"
  );

  const isIndeterminate = currentPoints == null || totalPoints == null;

  return (
    <Box flex="1" textAlign="left">
      <Text fontWeight="bold" mb={1}>
        {label}: {percentage}% ({currentPoints ?? 0}/{totalPoints ?? 0} pts)
      </Text>

      <Progress
        value={percentage}
        isIndeterminate={isIndeterminate}
        sx={{
          "& > div": {
            backgroundColor: barColor,
          },
        }}
      />
    </Box>
  );
};
