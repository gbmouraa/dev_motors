"use client";

import { use } from "react";
import { AuthContext } from "@/context/auth-context";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const { logout } = use(AuthContext);

  return (
    <button
      className="text-sm font-semibold text-gray-500 cursor-pointer"
      onClick={logout}
    >
      <span>Sair</span>
    </button>
  );
}
