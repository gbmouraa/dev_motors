import Image from "next/image";
import { formatCurrency } from "@/utils/format-currency";
import { MapPin, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { CarItemProps } from "@/types/car";

export function CarItem({
  id,
  name,
  model,
  year,
  km,
  city,
  price,
  images,
  isOnDashboard,
  onClick,
}: CarItemProps) {
  return (
    <div className="md:flex-col md:max-w-[214px] flex flex-row bg-white w-full rounded-lg overflow-hidden max-w-[820px] md:h-[390px]">
      {/* Image */}
      <div className="relative w-[40%] md:w-full h-[140px] md:h-[172px]">
        {/* Actions - only on dashboard page */}
        {isOnDashboard && (
          <div className="flex absolute top-2 left-2 z-10 gap-x-1">
            <Link href={`/edit-car/${id}`}>
              <button className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-gray-600 cursor-pointer hover:bg-neutral-800 hover:text-white transition-all">
                <Pencil size={12} />
              </button>
            </Link>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-gray-600 cursor-pointer hover:bg-neutral-800 hover:text-white transition-all"
              onClick={onClick}
            >
              <Trash size={12} />
            </button>
          </div>
        )}
        <Image
          src={images[0].url!}
          alt="Imagem do carro"
          className="object-cover"
          fill
          quality={100}
        />
      </div>
      <div className="flex flex-col w-full justify-between pt-4 flex-1">
        {/* Name/model */}
        <div className="text-[10px] font-semibold px-4">
          <p>{name.toUpperCase()}</p>
          <p className="text-gray-400 mt-[2px] md:text-xs">
            {model.toUpperCase()}
          </p>
        </div>
        {/* Price/year */}
        <div>
          <p className="text-sm font-semibold px-4 md:text-xl md:text-gray-500">
            {formatCurrency(price)}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 font-semibold flex justify-between border-b border-gray-200 px-4 pb-1 md:pb-3 md:pt-1">
            <span>{year}</span> <span>{km} km</span>
          </p>
          {/* City */}
          <p className="text-[10px] md:text-xs px-4 text-gray-400 font-semibold flex gap-x-[2px] items-center py-1 md:py-3">
            <MapPin size={12} />
            {city}
          </p>
        </div>
      </div>
    </div>
  );
}
