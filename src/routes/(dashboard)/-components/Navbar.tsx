import { Flex, FlexProps } from "@chakra-ui/react";
import { NavLink, NavLinkProps } from "./NavLink";
import { linkOptions } from "@tanstack/react-router";
import { LuCat, LuComponent, LuPalette, LuSettings } from "react-icons/lu";
import { UserContext } from "@/contexts/AuthContext";
import { useContext } from "react";
// import { StarIcon, SunIcon } from "@chakra-ui/icons";

interface Props extends FlexProps {
  isNavbarCollapsed: boolean;
}

export const Navbar: React.FC<Props> = ({ isNavbarCollapsed, ...rest }) => {
  const { isAdmin } = useContext(UserContext);

  const navLinks = [
    linkOptions({
      to: "/request",
      label: "Request",
      icon: <LuCat />,
    }),
    ...(isAdmin
      ? [
          linkOptions({
            to: "/settings",
            label: "Settings",
            icon: <LuSettings />,
          }),
        ]
      : []),
  ] satisfies NavLinkProps[];

  return (
    <Flex
      py="1rem"
      flexDirection="column"
      gap="0.5rem"
      shadow="rgba(0, 0, 0, 0.15) 1px 0px 6px 0px"
      overflow="auto"
      {...rest}
    >
      {navLinks.map((x, i) => (
        <NavLink key={i} isNavbarCollapsed={isNavbarCollapsed} {...x} />
      ))}
    </Flex>
  );
};
