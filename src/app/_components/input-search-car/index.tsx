import { IoSearch } from "react-icons/io5";

export function InputSearchCar() {
  return (
    <div className="bg-white shadow w-full max-w-4xl rounded-md py-6 gap-x-3 gap-y-6 px-5 -translate-y-6 flex items-center flex-wrap">
      <div className="flex-1 flex gap-2 min-w-[200px]">
        <IoSearch size={24} color="#4a5565" />
        <input
          type="text"
          placeholder="Digite marca ou modelo do carro"
          className="w-full font-bold placeholder:text-gray-400 outline-none border-none"
        />
      </div>
      <button className="bg-red-500 text-white rounded-md text-[13px] font-bold py-3 cursor-pointer hover:bg-red-700 transition-all w-full sm:max-w-40">
        VER OFERTAS
      </button>
    </div>
  );
}
