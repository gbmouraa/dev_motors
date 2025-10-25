import Link from "next/link";
import { SearchButton } from "./search-button";

export function InputSearchCar() {
  return (
    <div className="bg-white shadow w-full max-w-4xl rounded-md py-6 px-8 -translate-y-8">
      <div className="flex items-center gap-x-4 mb-6">
        <span className="block w-fit border-b-3 border- border-red-500 pb-1 text-gray-800 font-extrabold">
          Comprar carros
        </span>
        <Link
          href="/login"
          className="pb-1 text-gray-500 hover:text-gray-800 transition-colors font-extrabold border-b-3 border-transparent"
        >
          Quero vender
        </Link>
        <Link
          href="/"
          className="pb-1 text-gray-500 hover:text-gray-800 transition-colors font-extrabold border-b-3 border-transparent"
        >
          Todos carros
        </Link>
      </div>
      <SearchButton />
    </div>
  );
}
