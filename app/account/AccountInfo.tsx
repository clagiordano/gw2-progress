"use client";

import { IAccount } from "@/models/IAccount";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { AccountInfoOwner } from "@/app/account/AccountInfoOwner";
import { AccountInfoFeatures } from "./AccountInfoFeatures";
import { AccountInfoGuilds } from "./AccountInfoGuilds";
import { Suspense, useEffect, useState } from "react";

import { getAccountInfo, setToken } from "@/app/actions";

const initialState: IAccount = {
  id: "-",
  name: "-",
  age: 0,
  last_modified: "-",
  world: {
    id: 0,
    name: "-",
    population: "-",
  },
  guilds: [],
  guild_leader: [],
  created: "-",
  access: ["None"],
  commander: false,
  fractal_level: 0,
  daily_ap: 0,
  monthly_ap: 0,
  wvw_rank: 0,
  build_storage_slots: 0,
};

export const AccountInfo = () => {
  const [account, setAccount] = useState(initialState);

  useEffect(() => {
    getAccountInfo().then((data) => {
      console.log("account data", data);
      setAccount(data);
    }).catch((err) => {
      console.error('Error fetching account info:', err);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Account Information</Heading>
      </CardHeader>

      {/* <Suspense fallback="Loading..."> */}
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <AccountInfoOwner data={account} />

          <AccountInfoFeatures data={account.access} />

          <AccountInfoGuilds data={account.guilds} />

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Basic statistics
            </Heading>
            <Text pt="2" fontSize="sm">
              WvW rank, fractal, commander tag, recurring APs, (masteries?) etc
            </Text>
          </Box>
        </Stack>
      </CardBody>
      {/* </Suspense> */}
    </Card>
  );
};
