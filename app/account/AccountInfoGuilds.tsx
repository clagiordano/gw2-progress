"use client";

import { Heading, Box, Text, List, ListItem, Badge, HStack, Icon } from "@chakra-ui/react";
import { GiCastle } from "react-icons/gi";
import { useAccount } from "../context/AccountContext";
import { useColorModeValue, useTheme } from "@chakra-ui/react";

export const AccountInfoGuilds = () => {
  const { account } = useAccount();
  const theme = useTheme();

  const primaryText = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);
  const secondaryText = useColorModeValue(theme.colors.textSecondary.light, theme.colors.textSecondary.dark);
  const iconColor = secondaryText;

  const guilds = account.guilds ?? [];

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase" color={primaryText}>Guilds</Heading>

      {guilds.length === 0 ? (
        <Text pt={2} fontSize="sm" color={secondaryText}>This account is not a member of any guild.</Text>
      ) : (
        <>
          <Text pt={2} fontSize="sm" color={secondaryText}>Guilds this account belongs to</Text>

          <List spacing={3} mt={2}>
            {guilds.map(guild => (
              <ListItem key={guild.id}>
                <HStack spacing={3}>
                  <Icon as={GiCastle} boxSize={5} color={iconColor} />
                  <Badge variant="subtle" px={2} py={0.5} borderRadius="md" fontSize="0.75rem">{guild.tag}</Badge>
                  <Text fontWeight="semibold">{guild.name}</Text>
                  <Text fontSize="sm" color={secondaryText}>lvl {guild.level}</Text>
                  {guild.member_count !== undefined && (
                    <Text fontSize="sm" color={secondaryText}>{guild.member_count} / {guild.member_capacity} members</Text>
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
