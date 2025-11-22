import { Center, Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ExpansionInfo = ({
  available,
  text,
  tip,
  bg,
  fg = "white",
}: {
  available: boolean | "unknown"; // "unknown" for unconfirmed badges
  text: string | ReactNode;
  tip: string;
  bg: string;
  fg?: string;
}) => {
  const isAvailable = available === true;
  const isUnknown = available === "unknown";

  return (
    <Tooltip
      fontSize="md"
      label={
        isAvailable
          ? `${tip} is available`
          : isUnknown
          ? `${tip} availability unknown`
          : `${tip} is not available`
      }
    >
      <Center
        borderRadius="md"
        bg={isAvailable ? bg : isUnknown ? "gray.500" : "darkgray"}
        color={isAvailable ? fg : "gray.300"}
        px={4}
        h={16}
        w={16}
        display="flex"
        alignItems="center"
        justifyContent="center"
        opacity={isUnknown ? 0.7 : 1} // light transparency for “unknown” badge
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
