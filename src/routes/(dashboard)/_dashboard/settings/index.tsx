import { db } from "@/firebase/firebase";
import { Flex, Button } from "@chakra-ui/react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const Index: React.FC = () => {
  return (
    <Flex gap="1rem" mt="1rem">
      <Button
        px="0.5rem"
        borderRadius={4}
        variant="subtle"
        onClick={async () => {
          const collectionRef = collection(db, "staffs");
          let docRef = doc(collectionRef);
          await setDoc(docRef, {
            name: "Cloverbelle",
            regular_shifts: [
              { unit: "201", day: 0, shift: 1 },
              { unit: "201", day: 1, shift: 1 },
              { unit: "201", day: 2, shift: 1 },
              { unit: "201", day: 3, shift: 1 },
              { unit: "201", day: 4, shift: 1 },
            ],
          });

          docRef = doc(collectionRef);
          await setDoc(docRef, {
            name: "Kyle",
            regular_shifts: [
              { unit: "211-1", day: 1, shift: 0 },
              { unit: "211-1", day: 2, shift: 0 },
              { unit: "211-1", day: 3, shift: 0 },
              { unit: "211-1", day: 4, shift: 0 },
              { unit: "211-1", day: 5, shift: 0 },
            ],
          });

          docRef = doc(collectionRef);
          await setDoc(docRef, {
            name: "Milena",
            regular_shifts: [
              { unit: "211-2", day: 2, shift: 0 },
              { unit: "211-2", day: 3, shift: 0 },
              { unit: "211-2", day: 4, shift: 0 },
              { unit: "211-2", day: 5, shift: 0 },
              { unit: "211-2", day: 6, shift: 0 },
            ],
          });

          docRef = doc(collectionRef);
          await setDoc(docRef, {
            name: "Cesar",
            regular_shifts: [],
          });

          docRef = doc(db, "staffs", "1EoyDXTc5bWCh19X9tpUhnpgD2K3");
          await setDoc(docRef, {
            name: "You-Sheng",
            regular_shifts: [],
          });
        }}
      >
        Add staffs
      </Button>
      <Button
        px="0.5rem"
        borderRadius={4}
        variant="subtle"
        onClick={async () => {
          const batch = writeBatch(db);
          const collectionRef = collection(db, "units");
          ["201", "211-1", "211-2"].forEach((x) => {
            const docRef = doc(collectionRef);
            batch.set(docRef, { name: x });
          });
          await batch.commit();
        }}
      >
        Add Units
      </Button>
      <Button
        px="0.5rem"
        borderRadius={4}
        variant="subtle"
        onClick={async () => {
          await addDoc(collection(db, "admins"), {
            uid: "SG2q42F6ixXJY7yT1dXYjCZuMcI3",
          });
        }}
      >
        Add Admin
      </Button>
      <Button
        px="0.5rem"
        borderRadius={4}
        variant="subtle"
        onClick={async () => {
          const batch = writeBatch(db);
          const collectionRef = collection(db, "shifts");
          [0, 1, 2].forEach((shift) => {
            const docRef = doc(collectionRef);
            batch.set(docRef, {
              day: "2024-11-28",
              unit: "201",
              shift,
              staff: null,
            });
          });
          await batch.commit();
        }}
      >
        Test
      </Button>
    </Flex>
  );
};

export const Route = createFileRoute("/(dashboard)/_dashboard/settings/")({
  component: Index,
});
