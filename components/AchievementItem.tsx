import { Box, Flex, Image, Text, Badge, useColorMode } from "@chakra-ui/react";
import { Achievement } from "@/models/achievement";
import { useColorModeValue } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import { getProgressIndex } from "@/services/utils";
import { memo } from "react";

const AchievementItem = ({
  achievement,
  onClick,
}: {
  achievement: Achievement;
  onClick: (ach: Achievement) => void;
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  // Helper to get badge color based on progress
  const getBadgeColor = (
    uaPts: number | undefined,
    aPts: number | undefined
  ) => {
    if (!aPts || aPts <= 0) return undefined;
    const pct = Math.min(100, Math.round(((uaPts ?? 0) / aPts) * 100));
    const level = getProgressIndex(pct);
    return theme.colors.progressColors[level]?.[
      colorMode === "light" ? "light" : "dark"
    ];
  };

  const bg = useColorModeValue(
    theme.colors.cardBg.light,
    theme.colors.cardBg.dark
  );
  const hoverBg = useColorModeValue(
    theme.colors.cardHover.light,
    theme.colors.cardHover.dark
  );
  const badgeBg = getBadgeColor(achievement.uaPts, achievement.aPts);
  const secondaryText = useColorModeValue(
    theme.colors.textSecondary.light,
    theme.colors.textSecondary.dark
  );

  return (
    <Box
      key={achievement.id}
      p={3}
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
      bg={bg}
      _hover={{ bg: hoverBg }}
      onClick={() => onClick(achievement)}
    >
      <Flex align="center" gap={3}>
        {achievement.icon && (
          <Image
            borderRadius="full"
            boxSize="28px"
            src={achievement.icon}
            alt={achievement.name}
          />
        )}
        <Box flex="1" minW={0}>
          <Text fontWeight="semibold" noOfLines={1}>
            {achievement.name}
          </Text>
        </Box>
      </Flex>

      {/* Badge on a dedicated line below */}
      <Flex mt={2} justify="flex-end" gap={2} wrap="wrap">
        {!!achievement.rewards?.length && (
          <Badge colorScheme="green">Rewards</Badge>
        )}

        {!!achievement.tiers?.length && (
          <Badge
            bg={badgeBg}
            color={secondaryText}
            borderColor="rgba(0,0,0,0.12)"
          >
            {achievement.uaPts}/{achievement.aPts} pts
          </Badge>
        )}
      </Flex>
    </Box>
  );
};

export default memo(AchievementItem);
