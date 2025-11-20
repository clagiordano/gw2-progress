"use client";

import {
  IAchievement,
  IBit,
  ICategory,
  IGroup,
  ITier,
} from "@/models/IAchievements";
import { getColor } from "@/services/utils";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Progress,
  Image,
} from "@chakra-ui/react";

export const ProgressDetails = ({ data }: { data: IGroup[] }) => {
  return (
    <div>
      {/* <Suspense fallback="loading details component"> */}
      <Accordion allowToggle>
        {data.map((group: IGroup) => {
          return (
            <AccordionItem key={group.id}>
              {/* {({ isExpanded }) => (
                  <> */}
              <h2>
                <AccordionButton>
                  <AccordionIcon />

                  {/* <AccordionIcon as={isExpanded ? MinusIcon : AddIcon} /> */}
                  <Box as="span" flex="1" textAlign="left">
                    {/* {group.name} {group.gPtsPercent}% ({group.ugPts} /{" "}
                    {group.gPts}) */}
                    {group.name} {group.gPtsPercent}% ({group.ugPts} /{" "}
                    {group.gPts})
                    <Progress
                      value={group.gPtsPercent}
                      colorScheme={getColor(group.gPtsPercent)}
                    />
                  </Box>
                </AccordionButton>
              </h2>

              <AccordionPanel pb={4}>
                <Accordion allowToggle>
                  {group.categories.map((category: ICategory) => {
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

                            <Box as="span" flex="1" textAlign="left">
                              {category.name} {category.cPtsPercent}% (
                              {category.ucPts} / {category.cPts})
                              <Progress
                                value={category.cPtsPercent}
                                colorScheme={getColor(category.cPtsPercent)}
                              />
                            </Box>
                          </AccordionButton>
                        </h3>

                        <AccordionPanel pb={4}>
                          <Accordion allowToggle>
                            {category.achievements.map(
                              (achievement: IAchievement) => {
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
                                        <Accordion allowToggle>
                                          {achievement?.bits &&
                                            achievement?.bits.length > 0 && (
                                              <h5>Objectives:</h5>
                                            )}
                                          <ul>
                                            {achievement?.bits?.map(
                                              (bit: IBit, idx) => {
                                                if (bit.text) {
                                                  return (
                                                    <li key={idx}>{bit.text}</li>
                                                  );
                                                }

                                                if (bit.type === "Item") {
                                                  return (
                                                    <li key={idx}>
                                                      <>
                                                      <Image
                                                        src={bit?.item?.icon}
                                                        alt={bit?.item?.name}
                                                        boxSize="24px"
                                                        borderRadius="sm"
                                                      />
                                                      {bit?.item?.name}
                                                      </>
                                                    </li>
                                                  );
                                                }
                                              }
                                            )}
                                          </ul>

                                          {achievement?.tiers.length > 0 && (
                                            <h5>Tiers:</h5>
                                          )}

                                          <ul>
                                            {achievement?.tiers?.map(
                                              (tier: ITier, idx) => {
                                                return (
                                                  <li key={idx}>
                                                    Tier: {idx + 1} -{" "}
                                                    {tier.count}:
                                                    {" objectives, points "}
                                                    {tier.points}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </Accordion>
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
