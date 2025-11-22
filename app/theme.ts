// app/theme.ts
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Config per il color mode iniziale
const config: ThemeConfig = {
  initialColorMode: "dark",
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
    dark: "gray.800",
  },
  headerBg: {
    light: "white",
    dark: "gray.900",
  },
  footerBg: {
    light: "gray.100",
    dark: "gray.800",
  },
  mainBg: {
    light: "gray.50",
    dark: "gray.900",
  },
  text: {
    light: "gray.800",
    dark: "gray.50",
  },
  linkAlt: {
    light: "blue.600",
    dark: "blue.300",
  },
  link: {
    light: "gray.800",
    dark: "whiteAlpha.900",
  },
  linkActive: {
    light: "black",
    dark: "white",
  },
  linkCategory: {
    light: "gray.600",
    dark: "gray.400",
  },
  cardBg: {
    light: "gray.50",
    dark: "gray.700"
  },
  cardHover: {
    light: "gray.100",
    dark: "gray.600"
  },
  textPrimary: {
    light: "gray.800",
    dark: "gray.50",
  },
  textSecondary: {
    light: "gray.600",
    dark: "gray.400",
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "var(--font-rubik), sans-serif",
    body: "var(--font-rubik), sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg:
          props.colorMode === "light"
            ? colors.mainBg.light
            : colors.mainBg.dark,
        color:
          props.colorMode === "light" ? colors.text.light : colors.text.dark,
      },
      a: {
        color:
          props.colorMode === "light" ? colors.link.light : colors.link.dark,
        _hover: {
          textDecoration: "underline",
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
    Heading: {
      baseStyle: {
        color: (props: any) =>
          props.colorMode === "light" ? colors.text.light : colors.text.dark,
      },
    },
  },
});
