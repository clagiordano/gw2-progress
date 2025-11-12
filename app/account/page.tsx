import { AccountInfo } from "./AccountInfo";
import { Suspense } from "react";

export default function Account() {
  return (
    <Suspense>
      <AccountInfo />
    </Suspense>
  );
}
