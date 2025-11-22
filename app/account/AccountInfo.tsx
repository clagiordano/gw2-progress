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
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import { AccountInfoOwner } from "./AccountInfoOwner";
import { AccountInfoFeatures } from "./AccountInfoFeatures";
import { AccountInfoGuilds } from "./AccountInfoGuilds";
import { useAccount } from "../context/AccountContext";

export const AccountInfo = () => {
  const { loading } = useAccount();
    const theme = useTheme();

    const primaryText = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);
    const secondaryText = useColorModeValue(theme.colors.textSecondary.light, theme.colors.textSecondary.dark);

  return (
    <Card>
      <CardHeader>
        <Heading size="md" color={primaryText}>Account Information</Heading>
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
