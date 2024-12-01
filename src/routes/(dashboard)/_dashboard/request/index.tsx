import { Box, Button, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar } from "../../../../components/custom/calendar/Calendar";
import { map } from "@/firebase/database/utils";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { CanlendarCell } from "@/components/custom/calendar/CanlendarCell";
import { useContext } from "react";
import { UserContext } from "@/contexts/AuthContext";
import { StaffMenuButtonWithConfirmation } from "@/components/custom/admin/StaffMenuButtonWithConfirmation";
import { Staff } from "@/firebase/database/types";
import { ConfirmationDialog } from "@/components/custom/dialog/ConfirmationDialog";
import { StaffShiftButton } from "@/components/custom/staff/StaffShiftButton";

export const Schedule: React.FC = () => {
  const { user, isAdmin } = useContext(UserContext);

  const { data: staffs } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const staffs = await getDocs(collection(db, "staffs"));
      return map(staffs, (x) => ({ ...(x.data() as Staff), id: x.id }));
    },
  });

  const { data: units } = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const units = await getDocs(
        query(collection(db, "units"), orderBy("name"))
      );
      return map(units, (x) => ({ id: x.id, ...x.data() })) as {
        id: string;
        name: string;
      }[];
    },
  });

  const { data: shifts, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const unitShifts: {
        id: string;
        day: string;
        unitId: string;
        shift: number;
        staffId: string | null;
      }[] = [];
      const querySnapshot = await getDocs(collection(db, "upcoming_shifts"));
      querySnapshot.forEach((doc) => {
        unitShifts.push({
          id: doc.id,
          ...(doc.data() as any),
        });
      });
      return unitShifts;
    },
  });

  if (!staffs || !units || !shifts) return <Spinner />;

  const { from, to } = shifts.reduce(
    (accu, curr) => {
      if (curr.day < accu.from) return { from: curr.day, to: accu.to };
      if (curr.day > accu.to) return { from: accu.from, to: curr.day };
      return accu;
    },
    {
      from: shifts[0]?.day,
      to: shifts[0]?.day,
    }
  );

  return (
    <Box>
      <Flex mb="2rem" justifyContent="space-between">
        <Heading>Upcoming Schedule</Heading>
        {isAdmin && (
          <Link to="/request/new-cycle">
            <Button>Start new cycle</Button>
          </Link>
        )}
      </Flex>

      <Grid gap={4}>
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
                    withMonth={
                      date === from || new Date(date).getUTCDate() === 1
                    }
                  >
                    <Grid gap={1}>
                      {[0, 1, 2].map((shiftIdx, i) => {
                        const shift = shifts.find(
                          (x) =>
                            x.day === date &&
                            x.shift === shiftIdx &&
                            x.unitId === unit.id
                        );

                        if (!shift) return;

                        const staff = staffs.find(
                          (x) => x.id === shift.staffId
                        );

                        const isSelf = staff?.id === user.uid;

                        return isAdmin ? (
                          <StaffMenuButtonWithConfirmation
                            key={i}
                            value={shift?.staffId ?? null}
                            onChange={async (id) => {
                              const ref = doc(db, "upcoming_shifts", shift.id);
                              await updateDoc(ref, { staffId: id });
                              await refetch();
                            }}
                            staffs={staffs}
                            title="Overwrite this shift"
                            body={(newValue) => `
                              You're about to assign ${staffs.find((x) => x.id === newValue)?.name} to shift No. ${shiftIdx + 1} on ${date}.
                              ${staff ? `This will remove ${staff?.name} for the shift.` : ""}
                              Do you want to continue?
                            `}
                          />
                        ) : (
                          <StaffShiftButton
                            key={i}
                            {...(isSelf
                              ? {
                                  title: "Cancel Shift",
                                  body: `
                                    You're about to cancel shift No. ${shift.shift + 1} on ${shift.day}.
                                    Do you want to continue?`,
                                  onConfirm: async () => {
                                    const ref = doc(
                                      db,
                                      "upcoming_shifts",
                                      shift.id
                                    );
                                    await updateDoc(ref, { staffId: null });
                                    await refetch();
                                  },
                                }
                              : {
                                  title: "Request Shift",
                                  body: `
                                    You're about to request shift No. ${shift.shift + 1} on ${shift.day}.
                                    Do you want to continue?`,
                                  onConfirm: async () => {
                                    const ref = doc(
                                      db,
                                      "upcoming_shifts",
                                      shift.id
                                    );
                                    await updateDoc(ref, { staffId: user.uid });
                                    await refetch();
                                  },
                                })}
                          >
                            <Button
                              borderRadius={4}
                              {...(staff
                                ? isSelf
                                  ? {
                                      colorPalette: "red",
                                      variant: "subtle",
                                      children: staff.name,
                                    }
                                  : {
                                      disabled: true,
                                      variant: "ghost",
                                      children: staff.name,
                                    }
                                : {
                                    children: "Request",
                                    variant: "subtle",
                                  })}
                            />
                          </StaffShiftButton>
                        );
                      })}
                    </Grid>
                  </CanlendarCell>
                )}
              />
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute("/(dashboard)/_dashboard/request/")({
  component: Schedule,
});
