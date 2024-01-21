"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Suspense } from "react";

export const ProgressDetails = async ({ data }: { data: any[] }) => {
  return (
	<div>
	{/* <Suspense fallback="loading details component"> */}
      <Accordion allowToggle>
        {data.map((group: any) => {
          return (
            <AccordionItem key={group.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {group.name} {group.gPtsPercent}% ({group.ugPts} /{" "}
                    {group.gPts})
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel pb={4}>
                <Accordion allowToggle>
                  {group.categories.map((category: any) => {
                    return (
                      <AccordionItem key={category.id}>
                        <h3>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {category.name} {category.cPtsPercent}% (
                              {category.ucPts} / {category.cPts})
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>

                        <AccordionPanel pb={4}>
                          <Accordion allowToggle>
                            {category.achievements.map((achievement: any) => {
                              return (
                                <div key={achievement.id}>
                                  {/* <AccordionItem key={achievement.id}> */}
                                  {/* <h4> */}
                                  {/* <AccordionButton> */}

                                  {/* <Box as="span" flex="1" textAlign="left">
                                    {achievement.name} ({achievement.uaPts} /{" "}
                                    {achievement.aPts})
                                  </Box> */}

                                  {/* <AccordionIcon /> */}
                                  {/* </AccordionButton> */}
                                  {/* </h4> */}
                                  {/* </AccordionItem> */}
                                </div>
                              );
                            })}
                          </Accordion>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
	  {/* </Suspense> */}
	  </div>
  );
};
