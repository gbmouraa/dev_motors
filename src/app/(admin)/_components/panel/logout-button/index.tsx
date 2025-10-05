"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

export function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return (
    <button
      className="text-sm font-semibold text-gray-500 cursor-pointer"
      onClick={logout}
    >
      <span>Sair</span>
    </button>
  );
}
