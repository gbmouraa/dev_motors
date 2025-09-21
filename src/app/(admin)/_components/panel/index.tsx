import Link from "next/link";
import { LogoutButton } from "./logout-button";

export function Panel() {
  return (
    <div className="bg-red-500 flex items-center justify-between w-full my-4 py-4 px-4 rounded-lg">
      <div className="flex gap-3 items-center">
        <Link href="/dashboard" className="text-sm font-semibold text-white ">
          Dashboard
        </Link>
        <span className="text-white">|</span>
        <Link href="/add-new-car" className="text-sm font-semibold text-white">
          Cadastrar carro
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
}
