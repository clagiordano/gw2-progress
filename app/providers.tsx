"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import { ClientThemeProvider } from "./ClientThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {/* ColorModeScript imposta il tema corretto lato client */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ClientThemeProvider>
        {children}
      </ClientThemeProvider>
    </ChakraProvider>
  );
}
