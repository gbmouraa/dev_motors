"use client";

import { use } from "react";
import { AuthContext } from "@/context/auth-context";

export function LogoutButton() {
  const { logout } = use(AuthContext);

  return (
    <button
      className="text-sm font-semibold text-white cursor-pointer"
      onClick={logout}
    >
      Sair da conta
    </button>
  );
}
