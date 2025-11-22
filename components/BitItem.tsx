import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Bit } from "@/models/achievement";
import { theme } from "@/app/theme";

export const BitItem = ({ bit }: { bit: Bit }) => {
  // Text label to show
  const label = bit.text ?? bit.item?.name ?? bit.skin?.name ?? bit.minipet?.name;

  // Icon to show (if any)
  const icon = bit.item?.icon ?? bit.skin?.icon ?? bit.minipet?.icon;
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
