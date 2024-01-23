"use client";
import { IGroup } from "@/models/IAchievements";
import { getColor } from "@/services/utils";
import {
  CircularProgress,
  CircularProgressLabel,
  Card,
  CardBody,
  CardFooter,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

/**
 * ratio between AP and tiers -> easy - average - hard achivements
 * identify achievements almost completed
 *  - suggest achievements that can be easily completed
 *    - extract / generate list
 *
 * list ordered by percentage (asc / desc)
 */

export const ProgressStats = ({ data }: { data: IGroup[] }) => {
  return (
    <Wrap spacing={4}>
      {data.map((group: IGroup) => {
        return (
          <WrapItem key={group.id}>
            <Card h={150} w={220}>
              <CardBody p={1} textAlign={"center"}>
                <CircularProgress
                  value={group.gPtsPercent}
                  color={getColor(group.gPtsPercent)}
                  key={group.id}
                  size={"100px"}
                >
                  <CircularProgressLabel>
                    {group.gPtsPercent}%
                  </CircularProgressLabel>
                </CircularProgress>
              </CardBody>

              <CardFooter p={1} textAlign={"center"}>
                <Text w={"100%"}>{group.name}</Text>
              </CardFooter>
            </Card>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
