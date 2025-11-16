"use client";

import { Heading, Box, Text, Tooltip, HStack } from "@chakra-ui/react";
import { InfoOutlineIcon, CalendarIcon, AtSignIcon } from "@chakra-ui/icons";
import { useAccount } from "../context/AccountContext";

export const AccountInfoOwner = () => {
  const { account } = useAccount();

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Owner
      </Heading>
      <Text pt="2" fontSize="sm">
        Account basic information
      </Text>

      <HStack spacing={3}>
        <Tooltip label={`ID: ${account?.id}`} fontSize="md">
          <InfoOutlineIcon />
        </Tooltip>
        <Text fontSize="lg">{account?.name}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label="Account creation date" fontSize="md">
          <CalendarIcon />
        </Tooltip>
        <Text fontSize="lg">{account?.created}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label="Account last modification date" fontSize="md">
          <CalendarIcon />
        </Tooltip>
        <Text fontSize="lg">{account?.last_modified}</Text>
      </HStack>

      <HStack spacing={3}>
        <Tooltip label={`Current world: ${account?.world?.id}`} fontSize="md">
          <AtSignIcon />
        </Tooltip>
        <Text fontSize="lg">{account?.world?.name}</Text>
      </HStack>
    </Box>
  );
};
