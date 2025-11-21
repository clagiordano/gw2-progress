import { Box, Image, Text } from "@chakra-ui/react";
import { IBit } from "@/models/IAchievements";

export const BitItem = ({ bit }: { bit: IBit }) => {
  // Text label to show
  const label = bit.text ?? bit.item?.name ?? bit.skin?.name ?? bit.minipet?.name;

  // Icon to show (if any)
  const icon = bit.item?.icon ?? bit.skin?.icon ?? bit.minipet?.icon;

  return (
    <Box display="flex" alignItems="center" gap={2} p={1} borderRadius="md" bg="gray.50">
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
