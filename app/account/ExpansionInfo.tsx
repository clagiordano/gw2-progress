import { Center, Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ExpansionInfo = ({
  available,
  text,
  tip,
  bg,
  fg = "white",
}: {
  available: boolean;
  text: string | ReactNode;
  tip: string;
  bg: string;
  fg?: string;
}) => {
  return (
    <Tooltip
      fontSize="md"
      label={`${tip} is ${available ? "available" : "not available"}`}
    >
      <Center
        borderRadius="md"
        bg={available ? bg : "darkgray"}
        color={available ? fg : "gray.300"}
        px={4}
        h={16}
        w={16}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {typeof text === "string" ? (
          <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>{text}</span>
        ) : (
          text
        )}
      </Center>
    </Tooltip>
  );
};
