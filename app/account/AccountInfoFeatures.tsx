"use client";

import { Heading, Box, Text, HStack, Icon } from "@chakra-ui/react";
import { ExpansionInfo } from "./ExpansionInfo";
import { GiThornyVine, GiFireDash, GiDoubleDragon, GiSecretBook, GiSaberTooth, GiNightVision } from "react-icons/gi";
import { useAccount } from "../context/AccountContext";

export const AccountInfoFeatures = () => {
  const { account } = useAccount();

  const features = {
    hasF2P: false,
    hasGW2: false,
    hasHoT: false,
    hasPoF: false,
    hasEoD: false,
    hasSotO: false,
    hasJW: false,
    hasVoE: false,
  };

  account.access.forEach((acc) => {
    if (acc === "None") return;
    if (acc.includes("HeartOfThorns")) { features.hasGW2 = true; features.hasHoT = true; }
    if (acc.includes("PathOfFire")) { features.hasGW2 = true; features.hasPoF = true; }
    if (acc.includes("EndOfDragons")) { features.hasGW2 = true; features.hasEoD = true; }
    if (acc.includes("SecretsOfTheObscure")) { features.hasGW2 = true; features.hasSotO = true; }
    if (acc.includes("JanthirWilds")) { features.hasGW2 = true; features.hasJW = true; }
    if (acc.includes("VisionsOfEternity")) { features.hasGW2 = true; features.hasVoE = true; }
  });

  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Features
      </Heading>
      <Text pt="2" fontSize="sm">
        Expansion list availability
      </Text>
      <HStack spacing={4}>
        <ExpansionInfo available={features.hasGW2} text={features.hasGW2 ? "GW2" : "F2P"} tip="Guild Wars 2" bg="darkred" />
        <ExpansionInfo available={features.hasHoT} text={<Icon as={GiThornyVine} boxSize={6} />} tip="Heart of Thorns" bg="olivedrab" />
        <ExpansionInfo available={features.hasPoF} text={<Icon as={GiFireDash} boxSize={6} />} tip="Path of Fire" bg="darkmagenta" />
        <ExpansionInfo available={features.hasEoD} text={<Icon as={GiDoubleDragon} boxSize={6} />} tip="End of Dragons" bg="darkcyan" />
        <ExpansionInfo available={features.hasSotO} text={<Icon as={GiSecretBook} boxSize={6} />} tip="Secrets of the Obscure" bg="goldenrod" />
        <ExpansionInfo available={features.hasJW} text={<Icon as={GiSaberTooth} boxSize={6} />} tip="Janthir Wilds" bg="darkblue" />
        <ExpansionInfo available={features.hasVoE} text={<Icon as={GiNightVision} boxSize={6} />} tip="Visions of Eternity" bg="darkblue" />
      </HStack>
    </Box>
  );
};
