import { Box, Image, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import { Bit } from "@/models/achievement";


export const BitItem = ({ data }: { data: Bit }) => {
  // Text label to show
  let label = "";
  switch (data.type) {
    case "Text":
      label = data.text ?? "N/A";
      break;
    case "Item":
      label = data.item?.name ?? "N/A";
      break;
    case "Skin":
      label = data.skin?.name ?? "N/A";
      break;
    case "Minipet":
      label = data.minipet?.name ?? "N/A";
      break;
  }

  // Icon to show (if any)
  const icon = data.item?.icon ?? data.skin?.icon ?? data.minipet?.icon;
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
