"use client";

import {
  HStack,
  VStack,
  Box,
  Text,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  useTheme,
  useColorModeValue,
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

  // Dynamic color based on progress level
  const barColor = useColorModeValue(
    theme.colors.progressColors[level]?.light ?? "#3182ce",
    theme.colors.progressColors[level]?.dark ?? "#3182ce"
  );

  // Dynamic badge colors based on theme
  const doneColor = useColorModeValue("green.500", "green.300");
  const totalColor = useColorModeValue("gray.400", "gray.500");

  const isIndeterminate = currentPoints == null || totalPoints == null;

  return (
    <HStack align="center" spacing={4} w="full">
      {/* Circular progress */}
      <CircularProgress
        value={percentage}
        color={barColor}
		trackColor={useColorModeValue("gray.200", "gray.700")}
        size="50px"
        thickness="6px"
      >
        <CircularProgressLabel fontSize="sm">{percentage}%</CircularProgressLabel>
      </CircularProgress>

      {/* Label + progress bar */}
      <VStack flex="1" spacing={1} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="md">
            {label}
          </Text>
          <HStack spacing={2}>
            <Badge colorScheme={doneColor} fontSize="xs">
              {currentPoints ?? 0}
            </Badge>
            <Text fontSize="xs">/</Text>
            <Badge colorScheme={totalColor} fontSize="xs">
              {totalPoints ?? 0} pts
            </Badge>
          </HStack>
        </HStack>

        <Progress
          value={percentage}
          isIndeterminate={isIndeterminate}
          sx={{
            "& > div": { backgroundColor: barColor },
          }}
          size="sm"
          borderRadius="md"
        />
      </VStack>
    </HStack>
  );
};
