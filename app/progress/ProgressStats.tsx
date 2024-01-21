"use client";
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

const getColor = (value: number) => {
  if (value <= 25) {
    return "red.400";
  }

  if (value > 25 && value <= 75) {
    return "yellow.400";
  }

  return "green.400";
};

export const ProgressStats = async ({ data }: { data: any[] }) => {
  return (
    <Wrap spacing={4}>
      {data.map((group: any) => {
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
