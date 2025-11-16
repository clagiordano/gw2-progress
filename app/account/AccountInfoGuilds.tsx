"use client";

import { Heading, Box, Text, List, ListItem, Badge } from "@chakra-ui/react";
import { useAccount } from "../context/AccountContext";

export const AccountInfoGuilds = () => {
  const { account } = useAccount();

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Guilds
      </Heading>
      <Text pt="2" fontSize="sm">
        Guilds this account belongs to
      </Text>

      <List spacing={3}>
        {account.guilds.map((guild: any) => (
          <ListItem key={guild.id}>
            <Badge>{guild.tag}</Badge> {guild.name} - lvl {guild.level} - members {guild.member_count} / {guild.member_capacity}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
