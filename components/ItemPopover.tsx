"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Item } from "@/models/item";

interface ItemPopoverProps {
  item: Item;
  children: ReactNode;
}

export default function ItemPopover({ item, children }: ItemPopoverProps) {
  return (
    <Popover trigger="hover" placement="top-start" openDelay={150} closeDelay={200}>
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>

      <PopoverContent w="auto" maxW="sm" pointerEvents="none">
        <PopoverArrow />
        <PopoverBody>
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">{item.name}</Text>
            <Text>Type: {item.type}</Text>
            {item.details?.type && <Text>Subtype: {item.details.type}</Text>}

            {item.details?.bonuses && (
              <Box>
                <Text fontWeight="bold">Bonuses:</Text>
                <VStack align="start" spacing={0}>
                  {item.details.bonuses.map((b, i) => (
                    <Text key={i} fontSize="sm">
                      {b}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
