"use client";

import { useContext, useState, useEffect } from "react";
import { getUserCars } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";
import { AuthContext } from "@/context/auth-context";
import { CarItemProps, DeleteCarParams } from "@/types/car";
import { deleteCar } from "@/lib/firebase/storage";
import { Loader } from "../../../components/loader";

export default function Dashboard() {
  const [cars, setCars] = useState<CarItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!user) return;

        const res = await getUserCars(user.uid);
        if (res) setCars(res);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleDeleteCar = async ({ id, images }: DeleteCarParams) => {
    try {
      await deleteCar(id, images);

      const carListUpdated = cars?.filter((item) => item.id !== id);
      setCars(carListUpdated!);
    } catch (err) {
      console.error("Erro ao excluir carro:", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="relative h-[200px]">
          <Loader bg="bg-[#ECEDF2]" />
        </div>
      ) : (
        <section className="flex md:flex-wrap flex-col gap-3 md:flex-row">
          {cars.map((item) => (
            <CarItem
              id={item.id}
              key={item.id}
              name={item.name}
              model={item.model}
              year={item.year}
              km={item.km}
              city={item.city}
              price={item.price}
              images={item.images}
              isOnDashboard
              handleDeleteCar={() =>
                handleDeleteCar({ id: item.id, images: item.images })
              }
            />
          ))}
        </section>
      )}
    </>
  );
}
