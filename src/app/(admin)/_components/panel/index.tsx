"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function Panel() {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-lg mb-3">
      <div className="flex items-center justify-between w-full px-4 py-3">
        <div className="flex gap-3 items-center">
          <Link
            href="/dashboard"
            className={`text-sm font-semibold py-1 border-b-2 border-transparent ${
              pathname === "/dashboard"
                ? "text-gray-800 border-b-red-500"
                : "text-gray-500"
            }`}
          >
            Meus carros
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href="/add-new-car"
            className={`text-sm font-semibold py-2 border-b-2 border-transparent ${
              pathname === "/add-new-car"
                ? "text-gray-800 border-b-red-500"
                : "text-gray-500"
            }`}
          >
            Cadastrar carro
          </Link>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
