import { Group } from "@/models/achievement";
import { AccordionItem, AccordionButton, AccordionIcon, Box, Progress, AccordionPanel, Text } from "@chakra-ui/react";
import { ProgressBar } from "./ProgressBar";

export default function AchievementGroup({ group }: { group: Group }) {
  return (
    <AccordionItem key={group.id}>
      <AccordionButton>
        <AccordionIcon />
        <ProgressBar
          percentage={group.gPtsPercent}
          label={group.name}
          currentPoints={group.ugPts}
          totalPoints={group.gPts}
        />
      </AccordionButton>

      <AccordionPanel pb={4}>

      </AccordionPanel>
    </AccordionItem>
  );
}
