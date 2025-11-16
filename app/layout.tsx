"use client";

import { Suspense } from "react";
import { fonts } from "./fonts";
import { Providers } from "./providers";
import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Spacer,
  Spinner,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AccountProvider } from "./context/AccountContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const navBg = useColorModeValue("gray.50", "gray.900");
  const headerBg = useColorModeValue("white", "gray.800");
  const footerBg = useColorModeValue("gray.100", "gray.900");

  const links = [
    { href: "/account", label: "Account" },
    { href: "/progress", label: "Progress" },
    { href: "/progress/dailies", label: "Dailies" },
  ];

  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <AccountProvider>
            <Grid
              templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
              gridTemplateRows={"50px 1fr 30px"}
              gridTemplateColumns={"150px 1fr"}
              h="100vh"
              gap="1"
            >
              {/* Header */}
              <GridItem pl={4} pr={4} bg={headerBg} area={"header"} shadow="sm">
                <Flex alignItems="center" h="100%">
                  <Heading size="md">GW2 Progress</Heading>
                  <Spacer />
                  <ButtonGroup>
                    <Link href="/settings" as={NextLink}>
                      <IconButton
                        aria-label="Settings"
                        icon={<SettingsIcon />}
                      />
                    </Link>
                  </ButtonGroup>
                </Flex>
              </GridItem>

              {/* Sidebar */}
              <GridItem pl={4} pr={2} bg={navBg} area={"nav"} shadow="sm">
                <VStack align="stretch" spacing={3} mt={4}>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      as={NextLink}
                      fontWeight={path === link.href ? "bold" : "normal"}
                    >
                      {link.label}
                    </Link>
                  ))}
                </VStack>
              </GridItem>

              {/* Main content */}
              <GridItem
                pl={4}
                pr={4}
                pt={4}
                pb={4}
                area={"main"}
                overflowY="auto"
              >
                <Suspense fallback={<Spinner size="xl" />}>{children}</Suspense>
              </GridItem>

              {/* Footer */}
              <GridItem
                pl={4}
                pr={4}
                bg={footerBg}
                area={"footer"}
                shadow="inner"
              >
                <Flex h="100%" align="center" justify="center">
                  Footer content
                </Flex>
              </GridItem>
            </Grid>
          </AccountProvider>
        </Providers>
      </body>
    </html>
  );
}
