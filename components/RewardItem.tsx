import { Box, Image, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import { Reward } from "@/models/achievement";


export const RewardItem = ({ data }: { data: Reward }) => {
  // Text label & icon to show
  let label = "";
  let icon = null;
  switch (data.type) {
    case "Coins":
      label = `${data.type}: ${data.count} coins`;
      break;
    case "Item":
      label += data.item?.name ?? "not available";
      icon = data.item?.icon ?? null;
      break;
    case "Mastery":
      // TODO: icon = choose icon based on region
      label += `Mastery Point from ${data.region ?? "not available"}`;
      break;
    case "Title":
      label += `Title: ${data.title?.name ?? "not available"}`;
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
