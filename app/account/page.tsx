"use client";

import { AccountInfo } from "./AccountInfo";
import { Suspense } from "react";
import { Spinner, Center } from "@chakra-ui/react";

export default function Account() {
  return (
    <Suspense fallback={<Center h="full"><Spinner size="xl" /></Center>}>
      <AccountInfo />
    </Suspense>
  );
}
