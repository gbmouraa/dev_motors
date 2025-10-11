import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarItem } from "@/components/car-item";

import { CarItemProps } from "@/types/car";

interface CarouselProps {
  cars: CarItemProps[];
}

export function RecomendedCarsCarousel({ cars }: CarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {cars.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/4 lg:basis-1/5">
            <div>
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-x-full cursor-pointer bg-white text-gray-400 border-0 shadow-md" />
      <CarouselNext className="-translate-x-full cursor-pointer bg-white text-gray-400 border-0 shadow-md" />
    </Carousel>
  );
}
