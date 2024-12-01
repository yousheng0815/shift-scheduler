import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "@tanstack/react-router";
import { toUTCDate } from "@/utils/date";

const DAY_IN_MILL = 24 * 60 * 60 * 1000;

interface Props {
  from: string;
  to: string;
  getCell: (date: string) => ReactNode;
}

export const Calendar: React.FC<Props> = ({ from, to, getCell }) => {
  const fromDate = toUTCDate(from);
  const toDate = new Date(toUTCDate(to).getTime() + DAY_IN_MILL);
  const totalDays = (toDate.getTime() - fromDate.getTime()) / DAY_IN_MILL;
  const paddingDayCount = (fromDate.getUTCDay() + 6) % 7;

  return (
    <>
      <Grid
        templateColumns="repeat(7, 1fr)"
        gap="1px"
        p="1px"
        bg="gray.100"
        css={{ "& > *": { p: "0.5rem" } }}
      >
        {weekdays.map((weekday, i) => (
          <Box key={i} bg="white">
            {weekday}
          </Box>
        ))}
        {new Array(paddingDayCount).fill(null).map((_, i) => (
          <Box key={i} />
        ))}
        {Array(totalDays)
          .fill(null)
          .map((_, offset) => {
            const date = new Date(
              Date.UTC(
                fromDate.getUTCFullYear(),
                fromDate.getUTCMonth(),
                fromDate.getUTCDate() + offset
              )
            );

            return (
              <Box key={offset} bg="white">
                {getCell(date.toISOString().slice(0, 10))}
              </Box>
            );
          })}
      </Grid>
    </>
  );
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
