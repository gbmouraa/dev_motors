"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export function SearchButton() {
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSearchCar = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    router.push(`/car/search/${input}`);
  };

  return (
    <form onSubmit={handleSearchCar}>
      <div className=" gap-x-8 gap-y-6   flex items-center flex-wrap">
        <div className="flex-1 flex gap-4 min-w-[200px] h-[54px] border border-gray-300 rounded-md px-4 items-center">
          <IoSearch size={24} color="#4a5565" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite marca ou modelo do carro"
            className="w-full font-bold placeholder:text-gray-400 text-gray-900 outline-none border-none text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white rounded-md text-sm h-[54px] font-bold  cursor-pointer hover:bg-red-700 transition-all w-full sm:max-w-40"
        >
          VER OFERTAS
        </button>
      </div>
    </form>
  );
}
