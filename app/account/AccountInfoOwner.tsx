"use client";

import { Heading, Box, Text, HStack, Icon, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon, CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaGlobe } from "react-icons/fa";
import { useAccount } from "../context/AccountContext";
import { useColorModeValue, useTheme } from "@chakra-ui/react";

export const AccountInfoOwner = () => {
  const { account } = useAccount();
  const theme = useTheme();

  const primaryText = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);
  const secondaryText = useColorModeValue(theme.colors.textSecondary.light, theme.colors.textSecondary.dark);
  const iconColor = secondaryText;

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase" color={primaryText}>
        Owner
      </Heading>
      <Text pt={2} fontSize="sm" color={secondaryText}>
        Account basic information
      </Text>

      <HStack spacing={3} mt={2}>
        <Tooltip label={`ID: ${account?.id}`} fontSize="md">
          <Icon as={InfoOutlineIcon} boxSize={5} color={iconColor} />
        </Tooltip>
        <Text fontSize="lg" fontWeight="medium">{account?.name}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label="Account creation date" fontSize="md">
          <Icon as={CalendarIcon} boxSize={5} color={iconColor} />
        </Tooltip>
        <Text fontSize="md">{account?.created}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label="Account last modification date" fontSize="md">
          <Icon as={RepeatIcon} boxSize={5} color={iconColor} />
        </Tooltip>
        <Text fontSize="md">{account?.last_modified}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label={`Current world: ${account?.world?.id}`} fontSize="md">
          <Icon as={FaGlobe} boxSize={5} color={iconColor} />
        </Tooltip>
        <Text fontSize="md" fontWeight="medium">{account?.world?.name}</Text>
      </HStack>
    </Box>
  );
};
