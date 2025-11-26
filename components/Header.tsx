import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuGroup,
  MenuItem,
  AvatarBadge,
  Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAccount } from "@/app/context/AccountContext";

export default function Header({ onOpen }: { onOpen: () => void }) {
  const { account } = useAccount();
  const isLogged = Boolean(account?.name);

  return (
    <Flex alignItems="center" h="100%">
      <Heading size="md" as="h1">
        GW2 Progress
      </Heading>

      <Spacer />

      {/* Hamburger mobile only */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        mr={2}
      />

      <Menu>
        <Tooltip
          label={!isLogged ? "Not Connected" : account?.name}
          placement="bottom"
          openDelay={200}
        >
          <MenuButton>
            <Avatar name={account?.name || "Not Connected"} size="sm">
              <AvatarBadge
                boxSize="1.25em"
                bg={isLogged ? "green.500" : "tomato"}
              />
            </Avatar>
          </MenuButton>
        </Tooltip>

        <MenuList>
          <MenuGroup title="Settings">
            <MenuItem>{account?.name || "Not Connected"}</MenuItem>
            <MenuItem as={NextLink} href="/settings" icon={<SettingsIcon />}>
              Settings
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
