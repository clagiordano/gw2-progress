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
  Portal,
  PortalProps,
} from "@chakra-ui/react";
import { memo, ReactNode, useMemo } from "react";
import { Item } from "@/models/item";

interface ItemPopoverProps {
  item: Item;
  children: ReactNode;
  portalProps?: { containerRef?: PortalProps["containerRef"] };
}
const ItemPopoverComponent = ({
  item,
  children,
  portalProps,
}: ItemPopoverProps) => {
  const modifiers = useMemo(() => {
    const boundary =
      portalProps?.containerRef && "current" in portalProps.containerRef
        ? portalProps.containerRef.current ?? undefined
        : undefined;
    return boundary
      ? [
          { name: "preventOverflow", options: { boundary } },
          { name: "flip", options: { boundary } },
        ]
      : undefined;
  }, [portalProps]);

  return (
    <Popover
      trigger="hover"
      placement="top-start"
      openDelay={150}
      closeDelay={200}
      isLazy
      strategy="fixed"
      modifiers={modifiers}
    >
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>

      <Portal {...portalProps}>
        <PopoverContent w="auto" maxW="sm">
          <PopoverArrow />
          <PopoverBody>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">{item.name ?? "N/A"}</Text>
              <Text>Type: {item.type ?? "N/A"}</Text>
              {item.details?.type && <Text>Subtype: {item.details.type}</Text>}
              {item.details?.bonuses && (
                <Box>
                  <Text fontWeight="bold">Bonuses:</Text>
                  <VStack align="start" spacing={0}>
                    {item.details.bonuses.map((bonus) => (
                      <Text key={bonus} fontSize="sm">
                        {bonus}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default memo(ItemPopoverComponent);
