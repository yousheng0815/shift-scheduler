import { map } from "@/firebase/database/utils";
import { auth, db } from "@/firebase/firebase";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>(
  new Proxy({} as AuthContextType, {
    get: (_, property: string) => {
      throw new Error(`Can't access "${property}" outside AuthContext`);
    },
  })
);

type UserContextType = {
  user: User;
  isAdmin: boolean;
};

export const UserContext = createContext<UserContextType>(
  new Proxy({} as UserContextType, {
    get: (_, property: string) => {
      throw new Error(`Can't access "${property}" outside UserContext`);
    },
  })
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>();

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const admins = await getDocs(collection(db, "admins"));
      return map(admins, (x) => ({ ...x.data() })) as {
        uid: string;
      }[];
    },
  });

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (user === undefined) return <Spinner />;

  const isAdmin = !!admins?.find((x) => x.uid === user?.uid);

  return (
    <AuthContext.Provider value={{ user }}>
      {user ? (
        <UserContext.Provider value={{ user, isAdmin }}>
          {children}
        </UserContext.Provider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
