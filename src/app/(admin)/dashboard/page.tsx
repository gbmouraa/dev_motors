"use client";

import { useContext, useState, useEffect } from "react";
import { getUserCars } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";
import { AuthContext } from "@/context/auth-context";
import { CarItemProps } from "@/types/car";
import { deleteCar } from "@/lib/firebase/storage";

export default function Dashboard() {
  const [cars, setCars] = useState<CarItemProps[] | null>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      if (!user) return;

      const res = await getUserCars(user);
      if (res) setCars(res);
    };

    fetchCars();
  }, [user]);

  const handleDeleteCar = async ({ id, images }: CarItemProps) => {
    try {
      await deleteCar(id, images);

      const carListUpdated = cars?.filter((item) => item.id !== id);
      setCars(carListUpdated!);
    } catch (err) {
      console.error("Erro ao excluir carro:", err);
    }
  };

  if (!cars) return <section>Você não possui nenhum carro cadastrado</section>;

  return (
    <section className="flex flex-wrap flex-col gap-3 md:flex-row">
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
          onClick={() => handleDeleteCar(item)}
        />
      ))}
    </section>
  );
}
