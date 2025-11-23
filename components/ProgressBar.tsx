"use client";

import {
  Box,
  Text,
  Progress,
  useTheme,
  useColorModeValue,
  HStack,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  VStack,
} from "@chakra-ui/react";
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

  // Use light/dark color
  const barColor = useColorModeValue(
    theme.colors.progressColors[level]?.light ?? "#3182ce",
    theme.colors.progressColors[level]?.dark ?? "#3182ce"
  );

  const isIndeterminate = currentPoints == null || totalPoints == null;

  return (
    <HStack align="center" spacing={4} w="full">
      {/* Circular progress */}
      <CircularProgress
        value={percentage}
        color={barColor}
        size="50px"
        thickness="6px"
      >
        <CircularProgressLabel fontSize="sm">
          {percentage}%
        </CircularProgressLabel>
      </CircularProgress>

      {/* Label + progress bar */}
      <VStack flex="1" spacing={1} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="md">
            {label}
          </Text>
          <HStack spacing={1}>
            <Badge colorScheme="green" fontSize="xs">
              {currentPoints ?? 0}
            </Badge>
            <Text fontSize="xs">/</Text>
            <Badge colorScheme="gray" fontSize="xs">
              {totalPoints ?? 0} pts
            </Badge>
          </HStack>
        </HStack>

        <Progress
          value={percentage}
          isIndeterminate={isIndeterminate}
          sx={{
            "& > div": {
              backgroundColor: barColor,
            },
          }}
          size="sm"
          borderRadius="md"
        />
      </VStack>
    </HStack>
  );
};
