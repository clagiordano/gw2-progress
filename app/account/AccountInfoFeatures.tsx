"use client";

import { Heading, Box, HStack, Icon, Text } from "@chakra-ui/react";
import { ExpansionInfo } from "./ExpansionInfo";
import {
  GiThornyVine,
  GiFireDash,
  GiDoubleDragon,
  GiSecretBook,
  GiSaberTooth,
  GiIsland,
  GiGamepad,
} from "react-icons/gi";
import { useAccount } from "../context/AccountContext";
import { ReactNode } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const AccountInfoFeatures = () => {
  const { account } = useAccount();
const secondaryText = useColorModeValue("gray.600", "gray.400");

  const features = {
    hasF2P: false,
    hasGW2: false,
    hasHoT: false,
    hasPoF: false,
    hasEoD: false,
    hasSotO: false,
    hasJW: false,
    hasVoE: false, // default to false
  };

  account.access.forEach((acc) => {
    if (acc === "None") return;
    if (acc.includes("PlayForFree")) features.hasF2P = true;
    if (acc.includes("GuildWars2")) features.hasGW2 = true;
    if (acc.includes("HeartOfThorns")) {
      features.hasGW2 = true;
      features.hasHoT = true;
    }
    if (acc.includes("PathOfFire")) {
      features.hasGW2 = true;
      features.hasPoF = true;
      features.hasHoT = true;
    }
    if (acc.includes("EndOfDragons")) {
      features.hasGW2 = true;
      features.hasEoD = true;
    }
    if (acc.includes("SecretsOfTheObscure")) {
      features.hasGW2 = true;
      features.hasSotO = true;
    }
    if (acc.includes("JanthirWilds")) {
      features.hasGW2 = true;
      features.hasJW = true;
    }
    // No API access flag for VoE yet
  });

  const expansions: {
    key: string;
    available: boolean | "unknown";
    text: ReactNode;
    tip: string;
    bg: string;
  }[] = [
    ...(features.hasF2P && !features.hasGW2
      ? [
          {
            key: "hasF2P",
            available: true,
            text: "F2P",
            tip: "Play For Free",
            bg: "gray",
          },
        ]
      : []),
    {
      key: "hasGW2",
      available: features.hasGW2,
      text: <Icon as={GiGamepad} boxSize={6} />,
      tip: "Guild Wars 2 Base",
      bg: "darkred",
    },
    {
      key: "hasHoT",
      available: features.hasHoT,
      text: <Icon as={GiThornyVine} boxSize={6} />,
      tip: "Heart of Thorns",
      bg: "olivedrab",
    },
    {
      key: "hasPoF",
      available: features.hasPoF,
      text: <Icon as={GiFireDash} boxSize={6} />,
      tip: "Path of Fire",
      bg: "darkmagenta",
    },
    {
      key: "hasEoD",
      available: features.hasEoD,
      text: <Icon as={GiDoubleDragon} boxSize={6} />,
      tip: "End of Dragons",
      bg: "darkcyan",
    },
    {
      key: "hasSotO",
      available: features.hasSotO,
      text: <Icon as={GiSecretBook} boxSize={6} />,
      tip: "Secrets of the Obscure",
      bg: "goldenrod",
    },
    {
      key: "hasJW",
      available: features.hasJW,
      text: <Icon as={GiSaberTooth} boxSize={6} />,
      tip: "Janthir Wilds",
      bg: "darkblue",
    },
    {
      key: "hasVoE",
      available: "unknown", // currently not available from API
      text: <Icon as={GiIsland} boxSize={6} />,
      tip: "Visions of Eternity (unknown)",
      bg: "gray", // “disabled” color
    },
  ];

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Features
      </Heading>

      <Text pt="2" fontSize="sm" color={secondaryText}>
        Game access & expansions owned
      </Text>

      <HStack spacing={4} mt={2}>
        {expansions.map((exp) => (
          <ExpansionInfo
            key={exp.key}
            available={exp.available}
            text={exp.text}
            tip={exp.tip}
            bg={exp.bg}
          />
        ))}
      </HStack>
    </Box>
  );
};
