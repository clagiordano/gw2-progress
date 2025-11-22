import { Box, Heading, VStack, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export const SidebarLinks = ({
  groups,
  currentPath,
  onClickLink,
}: {
  groups: { label: string; links: { href: string; label: string; icon: any }[] }[];
  currentPath: string;
  onClickLink?: () => void;
}) => {
  const categoryColor = useColorModeValue("gray.600", "gray.400");
  const linkColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const linkActiveColor = useColorModeValue("black", "white");

  return (
    <VStack align="stretch" spacing={6} mt={4}>
      {groups.map((group) => (
        <Box key={group.label}>
          <Heading size="xs" mb={2} color={categoryColor}>
            {group.label}
          </Heading>

          <VStack align="stretch" spacing={1}>
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                as={NextLink}
                fontWeight={currentPath === link.href ? "bold" : "normal"}
                color={currentPath === link.href ? linkActiveColor : linkColor}
                onClick={onClickLink}
                display="flex"
                alignItems="center"
                gap={2}
                fontSize="sm"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};
