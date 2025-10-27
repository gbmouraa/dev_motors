import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CarItemProps } from "@/types/car";
import { CarItem } from "..";
import { deleteCar } from "@/lib/firebase/storage";

export function AlertDialogDeleteCar({
  id,
  name,
  model,
  year,
  km,
  city,
  price,
  images,
}: CarItemProps) {
  // const handleDeleteCar = async () => {
  //   await deleteCar(id, images);
  // };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-gray-600 cursor-pointer hover:bg-neutral-800 hover:text-white transition-all">
          <Trash size={12} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#ECEDF2] border-0">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-800">
            Você tem certeza?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            O seguinte carro será excluido dos seus anuncios
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CarItem
          id={id}
          model={model}
          year={year}
          km={km}
          city={city}
          price={price}
          images={images}
          name={name}
          isOnAlerDialogDeleteCar
        />
        {/* <div>
          <span className="mb-2 block">{carName}</span>
          <div className="relative w-full h-[160px] rounded-md overflow-hidden">
            <Image
              src={carImageUrl}
              className="object-cover"
              fill
              quality={100}
              alt={carName}
            />
          </div>
        </div> */}
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-gray-600 cursor-pointer hover:shadow-md hover:text-gray-900">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="bg-neutral-800 hover:opacity-95 hover:shadow-md text-white cursor-pointer">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
