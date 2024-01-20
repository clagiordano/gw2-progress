"use client";

import { CheckIcon } from "@chakra-ui/icons";
import { Stack, Input, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { getToken } from "../actions";

export const AccountForm = () => {
  const { pending } = useFormStatus();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getToken().then((data) => setAccessToken(data));
  }, []);

  return (
    <Stack spacing={4} direction="row">
      <Input
        placeholder="Access Token"
        name="accessToken"
        autoComplete="accessToken"
        aria-disabled={pending}
        value={accessToken}
        onChange={evt => setAccessToken(evt.target.value)}
      />
      <IconButton
        type="submit"
        aria-disabled={pending}
        colorScheme="blue"
        aria-label="Set access token"
        icon={<CheckIcon />}
      />
    </Stack>
  );
};
