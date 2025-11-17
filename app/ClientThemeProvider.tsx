"use client";

import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setColorMode(isDark ? "dark" : "light");
  }, [setColorMode]);

  return <>{children}</>;
}
