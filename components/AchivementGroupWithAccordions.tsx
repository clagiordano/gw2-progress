"use client";

import { BitItem } from "@/components/BitItem";
import {
  Achievement,
  Category,
  Group,
} from "@/models/achievement";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Progress,
  Image,
  Text
} from "@chakra-ui/react";
import { ProgressBar } from "./ProgressBar";

export const AchievementGroupWithAccordions = ({ data }: { data: Group[] }) => {
  return (
    <div>
      {/* <Suspense fallback="loading details component"> */}
      <Accordion allowToggle>
        {data.map((group: Group) => {
          return (
            <AccordionItem key={group.id}>
              {/* {({ isExpanded }) => (
                  <> */}
              <h2>
                <AccordionButton>
                  <AccordionIcon />

                  {/* <AccordionIcon as={isExpanded ? MinusIcon : AddIcon} /> */}
                  <ProgressBar
                    percentage={group.gPtsPercent}
                    label={group.name}
                    currentPoints={group.ugPts}
                    totalPoints={group.gPts}
                  />
                </AccordionButton>
              </h2>

              <AccordionPanel pb={4}>
                <Accordion allowToggle>
                  {group.categories.map((category: Category) => {
                    return (
                      <AccordionItem key={category.id}>
                        <h3>
                          <AccordionButton>
                            <AccordionIcon />

                            <Image
                              borderRadius="full"
                              boxSize="32px"
                              src={category.icon}
                              alt={category.name}
                            />

                            <ProgressBar
                              percentage={category.cPtsPercent}
                              label={category.name}
                              currentPoints={category.ucPts}
                              totalPoints={category.cPts}
                            />
                          </AccordionButton>
                        </h3>

                        <AccordionPanel pb={4}>
                          <Accordion allowToggle>
                            {category.achievements.map(
                              (achievement: Achievement) => {
                                return (
                                  <div key={achievement.id}>
                                    <AccordionItem key={achievement.id}>
                                      {/* <h4> */}
                                      <AccordionButton>
                                        <AccordionIcon />

                                        {/* <Image
                                          borderRadius="full"
                                          boxSize="32px"
                                          src={achievement.icon}
                                          alt={achievement.name}
                                        /> */}

                                        <Box
                                          as="span"
                                          flex="1"
                                          textAlign="left"
                                        >
                                          {achievement.name} (
                                          {achievement.uaPts} /{" "}
                                          {achievement.aPts})
                                        </Box>
                                      </AccordionButton>
                                      {/* </h4> */}
                                      <AccordionPanel pb={4}>
                                        {achievement?.bits && (
                                          <Box
                                            mb={4}
                                            p={2}
                                            borderRadius="md"
                                            bg="gray.50"
                                          >
                                            <Text fontWeight="bold" mb={2}>
                                              Objectives:
                                            </Text>
                                            <Box
                                              display="flex"
                                              flexDirection="column"
                                              gap={2}
                                            >
                                              {achievement?.bits?.map(
                                                (bit, idx) => (
                                                  <BitItem
                                                    key={idx}
                                                    data={bit}
                                                  />
                                                )
                                              )}
                                            </Box>
                                          </Box>
                                        )}

                                        {achievement.tiers?.length > 0 && (
                                          <Box
                                            p={2}
                                            borderRadius="md"
                                            bg="gray.50"
                                          >
                                            <Text fontWeight="bold" mb={2}>
                                              Tiers:
                                            </Text>
                                            <Box
                                              display="flex"
                                              flexDirection="column"
                                              gap={2}
                                            >
                                              {achievement.tiers.map(
                                                (tier, idx) => (
                                                  <Box
                                                    key={idx}
                                                    p={2}
                                                    borderRadius="md"
                                                    bg="gray.100"
                                                  >
                                                    Tier {idx + 1} —{" "}
                                                    {tier.count} objectives —{" "}
                                                    {tier.points} points
                                                  </Box>
                                                )
                                              )}
                                            </Box>
                                          </Box>
                                        )}
                                      </AccordionPanel>
                                    </AccordionItem>
                                  </div>
                                );
                              }
                            )}
                          </Accordion>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AccordionPanel>
              {/* </>
              )} */}
            </AccordionItem>
          );
        })}
      </Accordion>
      {/* </Suspense> */}
    </div>
  );
};
