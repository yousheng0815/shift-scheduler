import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { range, toUTCDate } from "@/utils/date";
import { Calendar } from "@/components/custom/calendar/Calendar";
import { CanlendarCell } from "@/components/custom/calendar/CanlendarCell";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useNavigate } from "@tanstack/react-router";
import { StaffMenuButton } from "@/components/custom/admin/StaffMenuButton";
import { Staff } from "@/firebase/database/types";

type Props = {
  from: string;
  to: string;
  staffs: Staff[];
  units: { id: string; name: string }[];
};

export const NewCycle: React.FC<Props> = ({ from, to, staffs, units }) => {
  const navigate = useNavigate();

  const [unitShifts, setUnitShifts] = useState(() => {
    // units.sort((a, b) => (a.name === b.name ? 0 : a.name > b.name ? 1 : -1));

    const defaultValue = range(from, to).flatMap((date) =>
      units.flatMap((unit) =>
        [0, 1, 2].flatMap((shift) => {
          const dayOfWeek = toUTCDate(date).getUTCDay();

          const staff = staffs.find((staff) =>
            staff.regular_shifts.find(
              (x) =>
                x.unit === unit.name && x.day === dayOfWeek && x.shift === shift
            )
          );

          return {
            day: date,
            unitId: unit.id,
            shift,
            staffId: staff?.id ?? null,
          };
        })
      )
    );

    return defaultValue;
  });

  return (
    <Grid gap="2rem">
      {from &&
        to &&
        units.map((unit) => (
          <Box key={unit.id}>
            <Heading size="md" mb="0.5rem">
              Unit {unit.name}
            </Heading>
            <Calendar
              from={from}
              to={to}
              getCell={(date) => (
                <CanlendarCell
                  date={date}
                  withMonth={date === from || new Date(date).getUTCDate() === 1}
                >
                  <Grid gap={1}>
                    {[0, 1, 2].map((shift, i) => {
                      const staffId =
                        unitShifts.find(
                          (x) =>
                            x.day === date &&
                            x.shift === shift &&
                            x.unitId === unit.id
                        )?.staffId ?? null;

                      return (
                        <StaffMenuButton
                          key={i}
                          value={staffId}
                          onChange={(value) => {
                            setUnitShifts((x) => {
                              const unitShift = x.find(
                                (x) =>
                                  x.day === date &&
                                  x.shift === shift &&
                                  x.unitId === unit.id
                              );
                              if (unitShift) unitShift.staffId = value;

                              return [...x];
                            });
                          }}
                          staffs={staffs}
                        />
                      );
                    })}
                  </Grid>
                </CanlendarCell>
              )}
            />
          </Box>
        ))}

      <Button
        onClick={async () => {
          //TODO: check if this overlaps another upcoming_shifts
          const batch = writeBatch(db);
          const collectionRef = collection(db, "upcoming_shifts");
          unitShifts.forEach((x) => {
            const docRef = doc(collectionRef);
            batch.set(docRef, x);
          });
          await batch.commit();

          navigate({ to: "/request" });
        }}
      >
        Publish
      </Button>
    </Grid>
  );
};
