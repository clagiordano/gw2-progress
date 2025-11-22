// app/theme.ts
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Config del color mode iniziale
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
  sidebarBg: { light: "gray.50", dark: "gray.800" },
  headerBg: { light: "white", dark: "gray.900" },
  footerBg: { light: "gray.100", dark: "gray.800" },
  mainBg: { light: "gray.50", dark: "gray.900" },
  textPrimary: { light: "gray.800", dark: "gray.50" },
  textSecondary: { light: "gray.600", dark: "gray.400" },
  link: { light: "gray.800", dark: "whiteAlpha.900" },
  linkActive: { light: "black", dark: "white" },
  linkCategory: { light: "gray.600", dark: "gray.400" },
  cardBg: { light: "gray.50", dark: "gray.700" },
  cardHover: { light: "gray.100", dark: "gray.600" },
  expansionBg: {
    light: {
      GW2: "red.600",
      HoT: "green.600",
      PoF: "purple.600",
      EoD: "cyan.600",
      SotO: "yellow.600",
      JW: "blue.600",
      VoE: "gray.400",
      F2P: "gray.400",
    },
    dark: {
      GW2: "red.300",
      HoT: "green.300",
      PoF: "purple.300",
      EoD: "cyan.300",
      SotO: "yellow.300",
      JW: "blue.300",
      VoE: "gray.500",
      F2P: "gray.500",
    },
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
        bg: props.colorMode === "light" ? colors.mainBg.light : colors.mainBg.dark,
        color: props.colorMode === "light" ? colors.textPrimary.light : colors.textPrimary.dark,
      },
      a: {
        color: props.colorMode === "light" ? colors.link.light : colors.link.dark,
        _hover: { textDecoration: "underline" },
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: (props: any) => ({
        color: props.colorMode === "light" ? colors.textPrimary.light : colors.textPrimary.dark,
      }),
    },
    Text: {
      baseStyle: (props: any) => ({
        color: props.colorMode === "light" ? colors.textPrimary.light : colors.textPrimary.dark,
      }),
    },
    Button: {
      baseStyle: { borderRadius: "md" },
    },
    Badge: {
      baseStyle: (props: any) => ({
        color: props.colorMode === "light" ? colors.textPrimary.light : colors.textPrimary.dark,
      }),
    },
  },
});
