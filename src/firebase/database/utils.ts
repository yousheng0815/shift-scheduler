import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import { AuthContext, UserContext } from "@/contexts/AuthContext";
import {
  collection,
  collectionGroup,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

export const useValue = <T>(path: string) => {
  const [value, setValue] = useState<T>();

  // useEffect(() => {
  //   const starCountRef = ref(db, path);

  //   return onValue(starCountRef, (snapshot) => {
  //     setValue(snapshot.val());
  //   });
  // }, [path]);

  return value;
};

export const useIsAdmin = () => {
  const { user } = useContext(AuthContext);
  const admins = useValue<Record<string, boolean>>(`/admins`);

  return user && admins?.[user.uid];
};

export const useEffectValue = <T>(getValue: () => Promise<T> | T) => {
  const getValueRef = useRef(getValue);

  const [value, setValue] = useState<T>();

  useEffect(() => {
    (async () => setValue(await getValueRef.current()))();
  }, []);

  return value;
};

export const map = <T>(
  querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
  fn: (x: QueryDocumentSnapshot<DocumentData, DocumentData>) => T
) => {
  const result: T[] = [];
  querySnapshot.forEach((x) => result.push(fn(x)));
  return result;
};
