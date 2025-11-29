"use client";

import { Achievement, Bit, Category, Group, Reward, Tier } from "@/models/achievement";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Text,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  useColorModeValue,
  useTheme,
  SimpleGrid,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { BitItem } from "./BitItem";
import { ProgressBar } from "./ProgressBar";
import { RewardItem } from "./RewardItem";
import { getProgressIndex } from "@/services/utils";

export const AchievementGroupWithDrawer = ({ data }: { data: Group[] }) => {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  const primaryText = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);
  const secondaryText = useColorModeValue(theme.colors.textSecondary.light, theme.colors.textSecondary.dark);
  const linkActiveColor = useColorModeValue(theme.colors.linkActive.light, theme.colors.linkActive.dark);

  const openDetails = (ach: Achievement) => {
    setSelected(ach);
    onOpen();
  };

  const { colorMode } = useColorMode();
  // Helper to get badge color based on progress
  const getBadgeColor = (uaPts: number | undefined, aPts: number | undefined) => {
    if (!aPts || aPts <= 0) return undefined;
    const pct = Math.min(100, Math.round(((uaPts ?? 0) / aPts) * 100));
    const level = getProgressIndex(pct);
    return theme.colors.progressColors[level]?.[colorMode === "light" ? "light" : "dark"];
  };

  const bg = useColorModeValue(
    theme.colors.cardBg.light,
    theme.colors.cardBg.dark
  );
  const hoverBg = useColorModeValue(
    theme.colors.cardHover.light,
    theme.colors.cardHover.dark
  );

  return (
    <>
      <Accordion allowToggle>
        {data.map((group: Group) => (
          <AccordionItem key={group.id}>
            <h2>
              <AccordionButton>
                <AccordionIcon />
                <ProgressBar
                  percentage={group.gPtsPercent}
                  label={group.name}
                  currentPoints={group?.ugPts ?? 0}
                  totalPoints={group?.gPts ?? 0}
                />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              {group.categories.map((category: Category) => (
                <Box
                  key={category.id}
                  p={3}
                  borderRadius="md"
                  borderWidth="1px"
                  mb={3}
                >
                  <Flex align="center" gap={3} mb={2}>
                    {category.icon && (<Image
                      borderRadius="full"
                      boxSize="50px"
                      src={category.icon}
                      alt={category.name}
                    />)}
                    <ProgressBar
                      percentage={category.cPtsPercent}
                      label={category.name}
                      currentPoints={category?.ucPts ?? 0}
                      totalPoints={category.cPts ?? 0}
                    />
                  </Flex>

                  {/* Achievements list */}
                  <Box mt={2}>
                    <SimpleGrid minChildWidth="300px" spacing={3}>
                      {category.achievements.map((achievement) => {
                         const badgeBg = getBadgeColor(achievement.uaPts, achievement.aPts);
                        return (
                        <Box
                          key={achievement.id}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          cursor="pointer"
                          bg={bg}
                          _hover={{ bg: hoverBg }}
                          onClick={() => openDetails(achievement)}
                        >

                          <Flex align="center" gap={3}>
                            {achievement.icon && (
                              <Image
                                borderRadius="full"
                                boxSize="28px"
                                src={achievement.icon}
                                alt={achievement.name}
                              />
                            )}
                            <Box flex="1" minW={0}>
                              <Text fontWeight="semibold" noOfLines={1}>
                                {achievement.name}
                              </Text>
                            </Box>
                          </Flex>

                          {/* Badge su una riga separata sotto */}
                          <Flex mt={2} justify="flex-end" gap={2} wrap="wrap">
                            {!!(achievement.rewards?.length) && (
                              <Badge colorScheme="green">Rewards</Badge>
                            )}

                            {!!(achievement.tiers?.length) && (
                              <Badge
                                bg={badgeBg}
                                color={secondaryText}
                                borderColor="rgba(0,0,0,0.12)"
                                >
                                {achievement.uaPts}/{achievement.aPts} pts
                              </Badge>
                            )}

                          </Flex>
                        </Box>
                        );
                      })}
                      </SimpleGrid>
                  </Box>
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Drawer with achievement details */}
      <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Box flex="1" minW={0}>
              {/* Name */}
              <Text fontWeight="semibold" noOfLines={1}>
                {selected?.name}
              </Text>
              {/* Description */}
              {selected?.description && (
              <Text fontSize="sm" color={secondaryText} noOfLines={2}>
                {selected?.description}
              </Text>)}
            </Box>
          </DrawerHeader>
          <DrawerBody>
            {selected && (
              <>
              {selected.rewards && selected.rewards.length > 0 && (
                  <>
                    <Text fontWeight="bold" mb={2}>
                      Rewards
                    </Text>
                    <ul>
                      {selected.rewards.map((reward: Reward, idx) => (
                        <RewardItem key={idx} data={reward} />
                      ))}
                    </ul>
                  </>
                )}

              {selected.tiers?.length > 0 && (
                  <>
                    <Text fontWeight="bold" mt={4} mb={2}>
                      Tiers
                    </Text>
                    <ul>
                      {selected.tiers.map((tier: Tier, idx) => (
                        <li key={idx}>
                          Tier {idx + 1}: {tier.count} objectives —{" "}
                          {tier.points}
                          points
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selected?.bits && selected.bits.length > 0 && (
                  <>
                    <Text fontWeight="bold" pt={2} mb={2}>
                      Objectives
                    </Text>
                    <Text fontSize="sm" color={primaryText}>
                      {selected.requirement}
                    </Text>

                    <ul>
                      {selected?.bits?.map((bit: Bit, idx) => (
                        <li key={idx}><BitItem data={bit} /></li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
