import Image from "next/image";
import { formatCurrency } from "@/utils/format-currency";
import { MapPin, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { CarItemProps, DeleteCarParams } from "@/types/car";
import { AlertDialogDeleteCar } from "./_components/alert-dialog-delete-car";

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
  isOnFavoritePage,
  isOnAlerDialogDeleteCar,
  handleDeleteCar,
}: CarItemProps) {
  const handleDeleteClick = () => {
    if (handleDeleteCar) {
      const data: DeleteCarParams = { id, images };
      handleDeleteCar(data);
    }
  };

  return (
    <div
      className={`relative ${
        !isOnAlerDialogDeleteCar ? "md:max-w-[214px]" : ""
      } w-full shadow rounded`}
    >
      <div
        className={`${
          !isOnAlerDialogDeleteCar ? "md:flex-col md:h-[390px]" : ""
        }  flex flex-row bg-white w-full rounded-lg overflow-hidden `}
      >
        {/* Image */}
        <div
          className={`relative w-[40%] h-[140px]  ${
            !isOnAlerDialogDeleteCar ? "md:h-[172px] md:w-full" : ""
          }`}
        >
          {/* Actions - only on dashboard page */}
          {isOnDashboard && (
            <div className="flex absolute top-2 right-2 z-20 gap-x-1">
              <Link href={`/edit-car/${id}`}>
                <button className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-gray-600 cursor-pointer hover:bg-neutral-800 hover:text-white transition-all">
                  <Pencil size={12} />
                </button>
              </Link>
              <AlertDialogDeleteCar
                id={id}
                name={name}
                model={model}
                year={year}
                km={km}
                city={city}
                price={price}
                images={images}
                onConfirm={handleDeleteClick}
              />
            </div>
          )}
          {isOnFavoritePage && (
            <div className="flex absolute top-2 right-2 z-20 gap-x-1">
              <button
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-gray-600 cursor-pointer hover:bg-neutral-800 hover:text-white transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onClick?.();
                }}
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
            <p
              className={`text-gray-400 mt-[2px]  ${
                !isOnAlerDialogDeleteCar ? "md:text-xs" : ""
              }`}
            >
              {model.toUpperCase()}
            </p>
          </div>
          {/* Price/year */}
          <div>
            <p
              className={`text-sm font-semibold px-4 ${
                !isOnAlerDialogDeleteCar ? "md:text-xl md:text-gray-500" : ""
              }`}
            >
              {formatCurrency(price)}
            </p>
            <p
              className={`text-[10px]  text-gray-400 font-semibold flex justify-between border-b border-gray-200 px-4 pb-1 ${
                !isOnAlerDialogDeleteCar ? "md:text-xs md:pb-3 md:pt-1" : ""
              }`}
            >
              <span>{year}</span> <span>{km} km</span>
            </p>
            {/* City */}
            <p
              className={`text-[10px]  px-4 text-gray-400 font-semibold flex gap-x-[2px] items-center py-1 ${
                !isOnAlerDialogDeleteCar ? "md:text-xs md:py-3" : ""
              }`}
            >
              <MapPin size={12} />
              {city}
            </p>
          </div>
        </div>
        {!isOnAlerDialogDeleteCar && (
          <Link
            href={`/car/${id}`}
            className="absolute left-0 top-0 right-0 bottom-0 z-10 rounded"
          />
        )}
      </div>
    </div>
  );
}
