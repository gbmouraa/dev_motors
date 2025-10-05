"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";

export function Private({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) redirect("/");

  return children;
}
