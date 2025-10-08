import Link from "next/link";
import { IoSearch } from "react-icons/io5";

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
          href="/login"
          className="pb-1 text-gray-500 hover:text-gray-800 transition-colors font-extrabold border-b-3 border-transparent"
        >
          Todos carros
        </Link>
      </div>
      <div className=" gap-x-8 gap-y-6   flex items-center flex-wrap">
        <div className="flex-1 flex gap-4 min-w-[200px] h-[54px] border border-gray-300 rounded-md px-4 items-center">
          <IoSearch size={24} color="#4a5565" />
          <input
            type="text"
            placeholder="Digite marca ou modelo do carro"
            className="w-full font-bold placeholder:text-gray-400 text-gray-900 outline-none border-none text-sm"
          />
        </div>
        <button className="bg-red-500 text-white rounded-md text-sm h-[54px] font-bold  cursor-pointer hover:bg-red-700 transition-all w-full sm:max-w-40">
          VER OFERTAS
        </button>
      </div>
    </div>
  );
}
