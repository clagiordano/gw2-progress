"use client";
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Suspense } from "react";

export const ProgressStats = async ({ data }: { data: any[] }) => {
  return (
	<div>
    {/* <Suspense fallback="loading stats component"> */}
      <StatGroup>
        <SimpleGrid columns={8} spacing={4}>
          {data.map((group: any) => {
            return (
              <Stat key={group.id}>
                <StatLabel>{group.name}</StatLabel>
                <StatNumber>{group.gPtsPercent}%</StatNumber>
                <StatHelpText>
                  {group.ugPts} / {group.gPts}
                </StatHelpText>
              </Stat>
            );
          })}
        </SimpleGrid>
      </StatGroup>
    {/* </Suspense> */}
	  </div>
  );
};
