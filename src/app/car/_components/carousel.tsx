import * as React from "react";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarImageProps } from "@/types/car";

interface CarouselImagesProps {
  images: CarImageProps[];
}

export function CarouselSize({ images }: CarouselImagesProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 pl-0">
            <div className="">
              <div className="relative w-full h-[200px] sm:h-[260px]  lg:h-[360px]">
                <Image
                  src={img.url!}
                  className="object-cover"
                  alt="Imagem do carro"
                  fill
                  quality={100}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="translate-x-[170%] cursor-pointer bg-white text-gray-400 border-0 shadow-md md:w-11 md:h-11" />
      <CarouselNext className="-translate-x-[170%] cursor-pointer bg-white text-gray-400 border-0 shadow-md md:w-11 md:h-11" />
    </Carousel>
  );
}
