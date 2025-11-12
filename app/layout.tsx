"use client";
import { Suspense } from "react";
import { fonts } from "./fonts";
import { Providers } from "./providers";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NextLink  from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Grid
            templateAreas={`"header header"
							"nav main"
							"nav footer"`}
            gridTemplateRows={"50px 1fr 30px"}
            gridTemplateColumns={"150px 1fr"}
            h="100vh"
            gap="1"
            // color="blackAlpha.700"
            // fontWeight="bold"
          >
            <GridItem pl="2" bg="orange.300" area={"header"}>
              <Flex minWidth="max-content" alignItems="center" pt={1} pr={1} gap="1">
                <Box p="2">
                  <Heading size="md">GW2 Progress</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap="1">
                  <Link href="/settings" as={NextLink}>
                    <IconButton aria-label="settings" icon={<SettingsIcon />} />
                  </Link>
                </ButtonGroup>
              </Flex>
            </GridItem>

            <GridItem pl="2" bg="pink.300" area={"nav"}>
              <VStack>
                <Link href="/account" as={NextLink} >Account</Link>
                <Link href="/progress" as={NextLink}>Progress</Link>
                <Link href="/progress/dailies" as={NextLink}>Dailies</Link>
              </VStack>
            </GridItem>
            <GridItem pl="2" area={"main"}>
              {/* <Suspense fallback={<Spinner size='xl' />}>{children}</Suspense> */}
              {children}
            </GridItem>
            <GridItem pl="2" bg="blue.300" area={"footer"}>
              Footer
            </GridItem>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
