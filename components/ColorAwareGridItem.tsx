"use client";

import { GridItem, GridItemProps, useColorModeValue, useTheme } from "@chakra-ui/react";

interface Props extends GridItemProps {
  children: React.ReactNode;
}

export const ColorAwareGridItem = ({ children, ...props }: Props) => {
  const theme = useTheme();
  const bg = useColorModeValue(theme.colors.headerBg.light, theme.colors.headerBg.dark);
  const color = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);

  return (
    <GridItem bg={bg} color={color} {...props}>
      {children}
    </GridItem>
  );
};
