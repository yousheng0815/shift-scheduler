import { Button, Flex, Box } from "@chakra-ui/react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ComponentProps, ReactNode } from "react";

export type NavLinkProps = ComponentProps<typeof Link> & {
  icon: ReactNode;
  label: string;
};

type Props = NavLinkProps & {
  isNavbarCollapsed: boolean;
};

export const NavLink: React.FC<Props> = ({
  isNavbarCollapsed,
  icon,
  label,
  ...rest
}) => {
  const matchRoute = useMatchRoute();
  const params = matchRoute({ to: rest.to, fuzzy: true });
  const isMatched = !!params;

  return (
    <Box>
      <Link {...rest}>
        <Button
          px="0.75rem"
          fontSize="sm"
          fontWeight="semibold"
          transition="0.3s, color 0s"
          _hover={{ color: "white", bg: "colorPalette.500" }}
          {...(isNavbarCollapsed
            ? {
                w: "4rem",
                borderRadius: "2xl",
                borderBottomRightRadius: "md",
                p: "1.5rem",
                mx: "0.5rem",
              }
            : { w: "15rem", borderRadius: 0, p: 4 })}
          {...(isMatched
            ? {
                bg: `colorPalette.500`,
                color: "white",
              }
            : {
                bg: "transparent",
                color: "gray.600",
              })}
        >
          <Flex w="full" alignItems="center" justifyContent="flex-start">
            {icon}
            <Box
              w="0"
              pl="3"
              transition="opacity 0.3s"
              opacity={isNavbarCollapsed ? 0 : 1}
            >
              {label}
            </Box>
          </Flex>
        </Button>
      </Link>
    </Box>
  );
};
