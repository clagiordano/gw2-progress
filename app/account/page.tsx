import { AccountInfo } from "./AccountInfo";
import { Suspense, useEffect, useState } from "react";

export default function Account() {
  return (
    <Suspense>
      <AccountInfo />
    </Suspense>
  );
}
