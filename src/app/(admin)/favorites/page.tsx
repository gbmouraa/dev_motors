"use client";

import { useEffect, useState, useContext } from "react";
import { CarItemProps } from "@/types/car";
import { AuthContext } from "@/context/auth-context";
import { getFavoritesCars, removeCarFromFavorites } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";

export default function Favorites() {
  const [cars, setCars] = useState<CarItemProps[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      if (!user) return;

      const res = await getFavoritesCars(user.uid);
      if (res) {
        setCars(res);
      }
    };

    fetchCars();
  }, [user]);

  const handleDeleteCarFromFavorites = async (carId: string) => {
    if (!user?.uid) return;
    await removeCarFromFavorites(carId, user.uid);
    setCars(cars.filter((item) => item.id !== carId));
  };

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
          isOnFavoritePage
          onClick={() => handleDeleteCarFromFavorites(item.id)}
        />
      ))}
    </section>
  );
}
