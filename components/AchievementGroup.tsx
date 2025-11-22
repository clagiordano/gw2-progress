import { Group } from "@/models/achievement";
import { getColor } from "@/services/utils";
import { AccordionItem, AccordionButton, AccordionIcon, Box, Progress, AccordionPanel, Text } from "@chakra-ui/react";

export default function AchievementGroup({ group }: { group: Group }) {
  return (
    <AccordionItem key={group.id}>
      <AccordionButton>
        <AccordionIcon />
        <Box flex="1" textAlign="left">
          <Text fontSize="xl" fontWeight="bold">
            {group.name}
          </Text>
          <Progress
            mt={2}
            value={group.gPtsPercent}
            colorScheme={getColor(group.gPtsPercent)}
          />
          <Text fontSize="sm" color="gray.500">
            {group.ugPts} / {group.gPts} points
          </Text>
        </Box>
      </AccordionButton>

      <AccordionPanel pb={4}>

      </AccordionPanel>
    </AccordionItem>
  );
}
