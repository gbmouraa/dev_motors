"use client";

import { useEffect, useTransition, useState } from "react";
import { getCars } from "@/lib/firebase/car";
import { CarItemProps, CarProps } from "@/types/car";
import { CarItem } from "@/components/car-item";
import { RecomendedCarsCarousel } from "./_components/carousel";

export function RecomendedCars() {
  const [cars, setCars] = useState<CarItemProps[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await getCars();
      if (res) setCars(res);
    };

    fetchCars();
  }, []);

  return (
    <section className="w-full mt-14">
      <p className="text-lg text-gray-600 font-bold">Recomendados</p>
      <div className="mt-4">
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
      </div>
    </section>
  );
}
