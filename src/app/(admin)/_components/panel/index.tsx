"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function Panel() {
  const pathname = usePathname();

  return (
    <div className="mb-3 px-1">
      <div className="flex items-center justify-between w-full  py-1">
        {pathname.startsWith("/edit-car") ? (
          <div className="flex gap-5 items-center">
            <span className="border-b-2 border-red-500 text-gray-800 text-sm font-medium">
              Editar carro
            </span>
            <Link
              href="/dashboard"
              className="flex gap-1 items-center text-red-500/80 text-sm font-medium hover:text-red-500 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
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
            <Link
              href="/add-new-car"
              className={`text-sm font-semibold py-1 border-b-2 border-transparent ${
                pathname === "/add-new-car"
                  ? "text-gray-800 border-b-red-500"
                  : "text-gray-500"
              }`}
            >
              Cadastrar carro
            </Link>
            <Link
              href="/favorites"
              className={`text-sm font-semibold py-1 border-b-2 border-transparent ${
                pathname === "/favorites"
                  ? "text-gray-800 border-b-red-500"
                  : "text-gray-500"
              }`}
            >
              Favoritos
            </Link>
          </div>
        )}
        <LogoutButton />
      </div>
    </div>
  );
}
