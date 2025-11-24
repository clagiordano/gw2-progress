import { Box, Image, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import { Reward } from "@/models/achievement";


export const RewardItem = ({ data }: { data: Reward }) => {
  // Text label & icon to show
  let label = `${data.type}: `;
  let icon = null;
  switch (data.type) {
    case "Coins":
      label += `${data.count} coins`;
      break;
    case "Item":
      label += data.item?.name ?? "N/A";
      icon = data.item?.icon ?? null;
      break;
    case "Mastery":
      label += data.mastery?.name ?? "N/A";
      break;
    case "Title":
      label += data.title?.name ?? "N/A";
      break;
  }

  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.cardBg.light, theme.colors.cardBg.dark);

  return (
    <Box display="flex" alignItems="center" gap={2} p={1} borderRadius="md" bg={bg}>
      {icon && (
        <Image
          src={icon}
          alt={label}
          boxSize="24px"
          borderRadius="sm"
        />
      )}
      <Text>{label}</Text>
    </Box>
  );
};
