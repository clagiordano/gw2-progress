import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },

  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },

  colors: {
    brand: {
      50: "#ffece6",
      100: "#ffd6bf",
      200: "#ffb08a",
      300: "#ff8a55",
      400: "#ff6420",
      500: "#e64b07",
      600: "#b93903",
      700: "#8c2701",
      800: "#5f1600",
      900: "#330700",
    },
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: "lg",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
      },
    },

    Card: {
      baseStyle: {
        borderRadius: "xl",
        shadow: "md",
        p: 4,
      },
    },
  },
});
