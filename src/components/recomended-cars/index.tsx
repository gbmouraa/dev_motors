"use client";

import { useContext, useEffect, useState } from "react";
import { getCars } from "@/lib/firebase/car";
import { CarItemProps } from "@/types/car";
import { CarItem } from "@/components/car-item";
import { RecomendedCarsCarousel } from "./_components/carousel";
import { RecomendedCarsSkeleton } from "./_components/skeleton";
import { AuthContext } from "@/context/auth-context";

export function RecomendedCars() {
  const [cars, setCars] = useState<CarItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getCars(user?.uid);
        if (res) setCars(res);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  return (
    <section className="w-full mt-14">
      <p className="text-lg text-gray-600 font-bold">Recomendados</p>
      <div className="mt-4">
        {isLoading ? (
          <RecomendedCarsSkeleton />
        ) : (
          <>
            <div className="md:hidden flex flex-col gap-y-3">
              {cars.map((item) => (
                <CarItem
                  id={item.id!}
                  key={item.id}
                  name={item.name}
                  model={item.model}
                  year={item.year}
                  km={item.km}
                  city={item.city}
                  price={item.price}
                  images={item.images}
                />
              ))}
            </div>
            <div className="hidden md:block">
              <RecomendedCarsCarousel cars={cars} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
