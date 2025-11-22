"use client";

import { Heading, Box, Text, List, ListItem, Badge, HStack, Icon } from "@chakra-ui/react";
import { GiCastle } from "react-icons/gi";
import { useAccount } from "../context/AccountContext";
import { useColorModeValue } from "@chakra-ui/react";

export const AccountInfoGuilds = () => {
  const { account } = useAccount();
  const secondaryText = useColorModeValue("gray.600", "gray.400");

  const guilds = account.guilds ?? [];

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Guilds
      </Heading>

      {guilds.length === 0 ? (
        <Text pt="2" fontSize="sm" color={secondaryText}>
          This account is not a member of any guild.
        </Text>
      ) : (
        <>
          <Text pt="2" fontSize="sm" color={secondaryText}>
            Guilds this account belongs to
          </Text>

          <List spacing={3}>
            {guilds.map((guild: any) => (
              <ListItem key={guild.id}>
                <HStack spacing={3}>
                  <Icon as={GiCastle} boxSize={5} color="gray.400" />

                  <Badge
                    variant="subtle"
                    px={2}
                    py={0.5}
                    borderRadius="md"
                    fontSize="0.75rem"
                  >
                    {guild.tag}
                  </Badge>

                  <Text fontWeight="semibold">{guild.name}</Text>

                  <Text fontSize="sm" color="gray.500">
                    lvl {guild.level}
                  </Text>

                  {guild.member_count !== undefined && (
                    <Text fontSize="sm" color="gray.500">
                      {guild.member_count} / {guild.member_capacity} members
                    </Text>
                  )}
                </HStack>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};
