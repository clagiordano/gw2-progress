"use client";

import { GridItem, GridItemProps, useColorModeValue } from "@chakra-ui/react";

interface Props extends GridItemProps {
  children: React.ReactNode;
}

export const ColorAwareGridItem = ({ children, ...props }: Props) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  return (
    <GridItem bg={bg} {...props}>
      {children}
    </GridItem>
  );
};
