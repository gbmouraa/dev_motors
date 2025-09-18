"use client";

import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  email: string;
  handleEmail: (email: string) => void;
  login: (email: string, password: string) => Promise<void>;
  sigin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  email: "",
  handleEmail: () => {},
  login: async () => {},
  sigin: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const sigin = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Cadastrado com sucesso");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, email, handleEmail, loading, login, sigin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
