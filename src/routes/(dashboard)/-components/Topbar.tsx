import { Button, Flex, Box, FlexProps, IconButton } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { LuLogOut, LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface Props extends FlexProps {
  isNavbarCollapsed: boolean;
  onIsNavbarCollapsedChange: () => void;
}

export const Topbar: React.FC<Props> = ({
  isNavbarCollapsed,
  onIsNavbarCollapsedChange,
  ...rest
}) => {
  return (
    <Flex alignItems="center" gap="0.75rem" bg="gray.400" {...rest}>
      <Link to="/">
        <Flex
          alignItems="center"
          gap="1rem"
          color="white"
          fontSize="xl"
          fontWeight="semibold"
        >
          Shift Scheduler
        </Flex>
      </Link>

      <Box flex="1" />

      <Link to="/my-account">
        <Flex alignItems="center" gap="0.75rem">
          <Avatar size="xs" variant="solid" />
        </Flex>
      </Link>

      <IconButton variant="ghost" onClick={async () => await signOut(auth)}>
        <LuLogOut />
      </IconButton>
    </Flex>
  );
};
