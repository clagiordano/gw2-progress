"use client";

import { useToast } from "@chakra-ui/react";
import { AccountForm } from "../account/AccountForm";
import { setToken } from "../actions";

export default function Settings() {
  const toast = useToast();
  async function saveToken(formData: FormData) {
    setToken(formData.get("accessToken") as string);
    toast({
    //   title: "Access token saved",
      description: "Access token stored!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <form action={saveToken}>
      <AccountForm />
    </form>
  );
}
