import {
  HStack,
  Box,
  Text,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";

interface ProgressLegendProps {
  steps?: number[]; // opzionale, default 0..7
}

export const ProgressLegend = ({
  steps = [0, 1, 2, 3, 4, 5, 6, 7],
}: ProgressLegendProps) => {
  const theme = useTheme();
  const isLight = useColorModeValue(true, false);

  return (
    <HStack spacing={2} mt={2} flex={1} wrap="wrap" justify="space-between">
      {steps.map((level) => {
        const color = isLight
          ? theme.colors.progressColors[level]?.light
          : theme.colors.progressColors[level]?.dark;

        // Etichette automatiche dai range definiti in getProgressIndex
        let label = "";
        switch (level) {
          case 0:
            label = "0–14%";
            break;
          case 1:
            label = "15–28%";
            break;
          case 2:
            label = "29–42%";
            break;
          case 3:
            label = "43–56%";
            break;
          case 4:
            label = "57–70%";
            break;
          case 5:
            label = "71–84%";
            break;
          case 6:
            label = "85–97%";
            break;
          case 7:
            label = "98–100%";
            break;
        }

        return (
          <HStack key={level} spacing={1}>
            <Box w={6} h={4} bg={color} borderRadius="sm" />
            <Text fontSize="xs">{label}</Text>
          </HStack>
        );
      })}
    </HStack>
  );
};
