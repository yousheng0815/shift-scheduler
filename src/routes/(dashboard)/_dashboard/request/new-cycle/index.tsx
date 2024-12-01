import { Box, Flex, Grid, Heading, Input, Spinner } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/firebase/firebase";
import { map } from "@/firebase/database/utils";
import { Field } from "@/components/ui/field";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NewCycle } from "./-components/NewCycle";
import { useQuery } from "@tanstack/react-query";

const Page: React.FC = () => {
  //TODO: check if this overlaps another upcoming_shifts
  const [from, setFrom] = useState<string>("2024-12-02");
  const [to, setTo] = useState<string>("2024-12-15");

  const { data: staffs } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      const staffs = await getDocs(collection(db, "staffs"));
      return map(staffs, (x) => ({ id: x.id, ...x.data() }));
    },
  });

  const { data: units } = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const units = await getDocs(
        query(collection(db, "units"), orderBy("name"))
      );
      return map(units, (x) => ({ id: x.id, ...x.data() }));
    },
  });

  if (!staffs || !units) return <Spinner />;

  return (
    <Box>
      <Flex mb="2rem" justifyContent="space-between">
        <Heading>Start new cycle</Heading>
      </Flex>
      <Grid
        templateColumns="repeat(auto-fit, minmax(15rem, 1fr))"
        gap="1rem"
        mb="1rem"
      >
        <Field label="From">
          <Input type="date" onChange={(e) => setFrom(e.target.value)} />
        </Field>
        <Field label="To">
          <Input type="date" onChange={(e) => setTo(e.target.value)} />
        </Field>
      </Grid>

      {from && to && (
        <NewCycle from={from} to={to} staffs={staffs} units={units} />
      )}
    </Box>
  );
};

export const Route = createFileRoute(
  "/(dashboard)/_dashboard/request/new-cycle/"
)({
  component: Page,
});
