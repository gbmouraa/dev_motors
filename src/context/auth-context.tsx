"use client";

import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase-connection";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export interface UserProps {
  uid: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: UserProps | null;
  email: string;
  name: string;
  loading: boolean;
  handleEmail: (email: string) => void;
  handleName: (name: string) => void;
  login: (email: string, password: string) => Promise<void>;
  sigin: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  email: "",
  name: "",
  loading: true,
  handleEmail: () => {},
  handleName: () => {},
  login: async () => {},
  sigin: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getUser = () => {
      const userStorage = localStorage.getItem("@web_motors");
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        setUser(userData as UserProps);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handleName = (name: string) => {
    setName(name);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      (firebaseUser) => {
        const userData = {
          uid: firebaseUser.user.uid,
          email: firebaseUser.user.email!,
          name: firebaseUser.user.displayName || "",
        };

        localStorage.setItem("@web_motors", JSON.stringify(userData));
        setUser(userData);
      }
    );
  };

  const sigin = async (name: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (firebaseUser) => {
        if (auth.currentUser) {
          await updateProfile(firebaseUser.user, { displayName: name });
          await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: name,
            uid: auth.currentUser.uid,
            favoriteCars: [],
          });
        }

        const userData = {
          name: name,
          email: email,
          uid: firebaseUser.user.uid,
        };

        localStorage.setItem("@web_motors", JSON.stringify(userData));
        setUser(userData);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    await signOut(auth).then(() => {
      localStorage.removeItem("@web_motors");
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        name,
        handleName,
        email,
        handleEmail,
        login,
        sigin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
