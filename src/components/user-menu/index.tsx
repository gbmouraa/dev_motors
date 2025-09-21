"use client";

import { use } from "react";
import { AuthContext } from "@/context/auth-context";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

export function UserMenu() {
  const { user } = use(AuthContext);

  return (
    <div className="border-l border-gray-200 h-14 flex items-center pl-6">
      <Link
        href={user ? "/dashboard" : "/login"}
        className="flex items-start gap-1 text-[13px] font-bold"
      >
        <FaRegUserCircle size={20} />
        {user ? user.name : "Entrar"}
      </Link>
    </div>
  );
}
