"use client";

import { Suspense } from "react";
import { fonts } from "./fonts";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import { AccountProvider } from "./context/AccountContext";
import {
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  Spacer,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon, HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ColorAwareGridItem } from "@/components/ColorAwareGridItem";
import { SidebarLinks } from "@/components/SidebarLinks";
import {
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
  HiOutlineChartBar,
  HiOutlineTrophy,
} from "react-icons/hi2";
// import { useColorModeValue } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const headerTextColor = useColorModeValue(
  //   theme.colors.text.light,
  //   theme.colors.text.dark
  // );

  const groupedLinks = [
    {
      label: "Account",
      links: [{ href: "/account", label: "Account", icon: HiOutlineUser }],
    },
    {
      label: "Items",
      links: [
        {
          href: "/items/explorer",
          label: "Explore Items",
          icon: HiOutlineMagnifyingGlass,
        },
        {
          href: "/items/stats",
          label: "Items Overview",
          icon: HiOutlineChartBar,
        },
      ],
    },
    {
      label: "Progression",
      links: [{ href: "/progress", label: "Progress", icon: HiOutlineTrophy }],
    },
  ];

  return (
    <html lang="en" className={fonts.rubik.variable}>
      <head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>

      <body>
        <ChakraProvider theme={theme}>
          <AccountProvider>
            <Grid
              templateAreas={{
                base: `"header header" "main main" "footer footer"`,
                md: `"header header" "nav main" "nav footer"`,
              }}
              gridTemplateRows={{ base: "60px 1fr 40px", md: "60px 1fr 40px" }}
              gridTemplateColumns={{ base: "1fr", md: "180px 1fr" }}
              h="100vh"
              gap={1}
            >
              {/* Header */}
              <ColorAwareGridItem area={"header"} pl={4} pr={4} shadow="sm">
                <Flex alignItems="center" h="100%">
                  <Heading size="md">
                    GW2 Progress
                  </Heading>
                  <Spacer />
                  {/* Hamburger solo mobile */}
                  <IconButton
                    aria-label="Open menu"
                    icon={<HamburgerIcon />}
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                    mr={2}
                  />
                  <ButtonGroup display={{ base: "none", md: "flex" }}>
                    <Link href="/settings" as={NextLink}>
                      <IconButton
                        aria-label="Settings"
                        icon={<SettingsIcon />}
                      />
                    </Link>
                  </ButtonGroup>
                </Flex>
              </ColorAwareGridItem>

              {/* Sidebar Desktop */}
              <ColorAwareGridItem
                area={"nav"}
                pl={4}
                pr={2}
                shadow="sm"
                display={{ base: "none", md: "block" }}
              >
                <SidebarLinks groups={groupedLinks} currentPath={path} />
              </ColorAwareGridItem>

              {/* Main content */}
              <ColorAwareGridItem
                area={"main"}
                pl={4}
                pr={4}
                pt={4}
                pb={4}
                overflowY="auto"
              >
                <Suspense fallback={<Spinner size="xl" />}>{children}</Suspense>
              </ColorAwareGridItem>

              {/* Footer */}
              <ColorAwareGridItem area={"footer"} pl={4} pr={4} shadow="inner">
                <Flex h="100%" align="center" justify="center"></Flex>
              </ColorAwareGridItem>

              {/* Drawer mobile */}
              <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <SidebarLinks
                      groups={groupedLinks}
                      currentPath={path}
                      onClickLink={onClose}
                    />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Grid>
          </AccountProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
