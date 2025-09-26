"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function Panel() {
  const pathname = usePathname();

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between w-full p-4 rounded-t-lg ">
        <div className="flex gap-3 items-center">
          <Link
            href="/dashboard"
            className={`text-sm font-semibold ${
              pathname === "/dashboard" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Dashboard
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href="/add-new-car"
            className={`text-sm font-semibold ${
              pathname === "/add-new-car" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Cadastrar carro
          </Link>
        </div>
        <LogoutButton />
      </div>
      <div className="w-[98%] mx-auto  h-px bg-gray-200"></div>
    </div>
  );
}
