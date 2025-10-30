"use client";

import { useEffect, useState, useContext } from "react";
import { CarItemProps } from "@/types/car";
import { AuthContext } from "@/context/auth-context";
import { getFavoritesCars, removeCarFromFavorites } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";
import { Loader } from "../../../components/loader";
import { Car } from "lucide-react";

export default function Favorites() {
  const [cars, setCars] = useState<CarItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!user) return;

        const res = await getFavoritesCars(user.uid);
        if (res) setCars(res);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleDeleteCarFromFavorites = async (carId: string) => {
    if (!user?.uid) return;
    await removeCarFromFavorites(carId, user.uid);
    setCars(cars.filter((item) => item.id !== carId));
  };

  if (isLoading) {
    return (
      <div className="relative h-[200px]">
        <Loader bg="bg-[#ECEDF2]" />
      </div>
    );
  }

  return (
    <>
      {cars.length === 0 ? (
        <div>
          <p className="flex items-center text-gray-600 gap-2">
            <Car size={20} />
            Você não possui nenhum anuncio favoritado.{" "}
          </p>
        </div>
      ) : (
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
      )}
    </>
  );
}
