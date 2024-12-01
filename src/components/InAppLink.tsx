import { Link } from "@chakra-ui/react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "@tanstack/react-router";
import { FC } from "react";

interface Props extends RouterLinkProps {}

export const InAppLink: FC<Props> = (props) => {
  return (
    <Link>
      <RouterLink {...props} />
    </Link>
  );
};
