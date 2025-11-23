"use client";
import { theme } from "@/app/theme";
import { Group } from "@/models/achievement";
import { getProgressIndex } from "@/services/utils";
import {
  CircularProgress,
  CircularProgressLabel,
  Card,
  CardBody,
  CardFooter,
  Text,
  Wrap,
  WrapItem,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * ratio between AP and tiers -> easy - average - hard achivements
 * identify achievements almost completed
 *  - suggest achievements that can be easily completed
 *    - extract / generate list
 *
 * list ordered by percentage (asc / desc)
 */

const GetColorBylevel = (percentage: number) => {
  const level = getProgressIndex(percentage);
    // Dynamic color based on progress level
  const barColor = useColorModeValue(
    theme.colors.progressColors[level]?.light ?? "#3182ce",
    theme.colors.progressColors[level]?.dark ?? "#3182ce"
  );
  return barColor;
}

export const ProgressStats = ({ data }: { data: Group[] }) => {
   const theme = useTheme();

  return (
    <Wrap spacing={4}>
      {data.map((group: Group) => {
        return (
          <WrapItem key={group.id}>
            <Card h={150} w={220}>
              <CardBody p={1} textAlign={"center"}>
                <CircularProgress
                  value={group.gPtsPercent}
                  color={GetColorBylevel(group.gPtsPercent)}
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
