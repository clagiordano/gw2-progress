"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  SkeletonText,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect, Suspense } from "react";
import { rarityColor } from "@/app/lib/itemHelper";

export default function ItemsStats() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/items/stats`)
      .then((res) => res.json())
      .then(setResults)
      .finally(() => setLoading(false));
  }, []);

  return (
    <SkeletonText isLoaded={!loading}>
        <Accordion allowMultiple>
        {results.map((typeGroup) => (
            <AccordionItem key={typeGroup.type}>
            <AccordionButton>
                <Box flex="1" textAlign="left">
                {typeGroup.type} ({typeGroup.count})
                </Box>
                <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
                <VStack spacing={3} align="stretch">
                {typeGroup.subtypes.map((sub: any) => (
                    <Box
                    key={sub.subtype || "null"}
                    p={2}
                    borderWidth={1}
                    borderRadius="md"
                    >
                    <Text fontWeight="semibold">
                        {sub.subtype ?? "No Subtype"} ({sub.count})
                    </Text>
                    <HStack spacing={2} mt={1} wrap="wrap">
                        {sub.rarities.map((r: any) => (
                        <Tag
                            key={r.rarity}
                            size="sm"
                            color={rarityColor(r.rarity)}
                        >
                            {r.rarity}: {r.count}
                        </Tag>
                        ))}
                    </HStack>
                    </Box>
                ))}
                </VStack>
            </AccordionPanel>
            </AccordionItem>
        ))}
        </Accordion>
    </SkeletonText>
  );
}
