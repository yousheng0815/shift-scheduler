import { toUTCDate, isToday, toLocalDate } from "@/utils/date";
import { Box, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface Props {
  date: string;
  withMonth?: boolean;
}

export const CanlendarCell: React.FC<PropsWithChildren<Props>> = ({
  date,
  withMonth,
  children,
}) => {
  const localDate = toLocalDate(date);

  return (
    <Box>
      <Flex mb="0.5rem" gap="0.5rem" alignItems="center">
        <Flex
          fontWeight="semibold"
          borderRadius="50%"
          boxSize="2rem"
          alignItems="center"
          justifyContent="center"
          {...(isToday(date)
            ? { color: "gray.100", bg: "blue.500" }
            : { color: "gray.800" })}
        >
          {localDate.getDate()}
        </Flex>
        <Box color="gray.400">
          {withMonth && localDate.toLocaleString("en-US", { month: "long" })}
        </Box>
      </Flex>
      {children}
    </Box>
  );
};
