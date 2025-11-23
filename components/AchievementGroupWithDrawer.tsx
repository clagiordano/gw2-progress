"use client";

import { Achievement, Bit, Category, Group, Tier } from "@/models/achievement";

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
} from "@chakra-ui/react";
import {  useState } from "react";
import { BitItem } from "./BitItem";
import { ProgressBar } from "./ProgressBar";

export const AchievementGroupWithDrawer = ({ data }: { data: Group[] }) => {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  const openDetails = (ach: Achievement) => {
    setSelected(ach);
    onOpen();
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
                  currentPoints={group.ugPts}
                  totalPoints={group.gPts}
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
                      currentPoints={category.ucPts}
                      totalPoints={category.cPts}
                    />
                  </Flex>

                  {/* Achievements list */}
                  <Box mt={2}>
                    {category.achievements.map((achievement) => (
                      <Box
                        key={achievement.id}
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        mb={2}
                        cursor="pointer"
                        bg={bg}
                        _hover={{ bg: hoverBg }}
                        onClick={() => openDetails(achievement)}
                      >
                        <Flex align="center" gap={3} mb={2}>
                          {achievement.icon && (<Image
                            borderRadius="full"
                            boxSize="32px"
                            src={achievement.icon}
                            alt={achievement.name}
                          />)}
                          <Text fontWeight="medium">
                            {achievement.name} ({achievement.uaPts}/
                            {achievement.aPts})
                          </Text>
                        </Flex>
                      </Box>
                    ))}
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
          <DrawerHeader>{selected?.name}</DrawerHeader>
          <DrawerBody>
            {selected && (
              <>
                {selected?.bits && selected.bits.length > 0 && (
                  <>
                    <Text fontWeight="bold" mb={2}>
                      Objectives
                    </Text>
                    <ul>
                      {selected?.bits?.map((bit: Bit, idx) => (
                        <BitItem key={idx} bit={bit} />
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
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
