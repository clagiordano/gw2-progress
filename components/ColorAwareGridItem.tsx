"use client";

import { GridItem, GridItemProps, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ColorAwareGridItemProps extends GridItemProps {
  children: ReactNode;
}

export const ColorAwareGridItem = ({ children, ...rest }: ColorAwareGridItemProps) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  return (
    <GridItem bg={bg} {...rest}>
      {children}
    </GridItem>
  );
};
