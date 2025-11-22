import {
  Box,
  Heading,
  VStack,
  Link,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const SidebarLinks = ({
  groups,
  currentPath,
  onClickLink,
}: {
  groups: {
    label: string;
    links: { href: string; label: string; icon: any }[];
  }[];
  currentPath: string;
  onClickLink?: () => void;
}) => {
const theme = useTheme();
  const linkCategoryColor = useColorModeValue(theme.colors.linkCategory.light, theme.colors.linkCategory.dark);
  const linkColor = useColorModeValue(theme.colors.link.light, theme.colors.link.dark);
  const linkActiveColor = useColorModeValue(theme.colors.linkActive.light, theme.colors.linkActive.dark);

  return (
    <VStack align="stretch" spacing={6} mt={4}>
      {groups.map((group) => (
        <Box key={group.label}>
          <Heading size="xs" mb={2} color={linkCategoryColor}>
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
