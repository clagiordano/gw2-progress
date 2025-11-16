"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Stack,
  StackDivider,
  Skeleton,
} from "@chakra-ui/react";
import { AccountInfoOwner } from "./AccountInfoOwner";
import { AccountInfoFeatures } from "./AccountInfoFeatures";
import { AccountInfoGuilds } from "./AccountInfoGuilds";
import { useAccount } from "../context/AccountContext";

export const AccountInfo = () => {
  const { account, loading } = useAccount();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Account Information</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Skeleton isLoaded={!loading}>
            <AccountInfoOwner />
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <AccountInfoFeatures />
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <AccountInfoGuilds />
          </Skeleton>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Basic statistics
            </Heading>
            <Skeleton isLoaded={!loading}>
              <Box pt="2" fontSize="sm">
                WvW rank, fractal, commander tag, recurring APs, (masteries?) etc
              </Box>
            </Skeleton>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
