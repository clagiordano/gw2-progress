// app/theme.ts
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Config per il color mode iniziale
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// Palette colori personalizzata
const colors = {
  brand: {
    50: "#ffe6e6",
    100: "#ffb3b3",
    200: "#ff8080",
    300: "#ff4d4d",
    400: "#ff1a1a",
    500: "#e60000",
    600: "#b30000",
    700: "#800000",
    800: "#4d0000",
    900: "#1a0000",
  },
  sidebarBg: {
    light: "gray.50",
    dark: "gray.900",
  },
  headerBg: {
    light: "white",
    dark: "gray.800",
  },
  footerBg: {
    light: "gray.100",
    dark: "gray.900",
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.900",
        color: props.colorMode === "light" ? "gray.800" : "whiteAlpha.900",
      },
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
      },
    },
  },
});
