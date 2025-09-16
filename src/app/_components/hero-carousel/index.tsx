"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import carouselImage1 from "./assets/carousel-img-1.png";
import carouselImage2 from "./assets/carousel-img-2.png";
import carouselImage3 from "./assets/carousel-img-3.jpeg";
import carouselImage4 from "./assets/carousel-img-4.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const carouselImages = [
    carouselImage1,
    carouselImage2,
    carouselImage3,
    carouselImage4,
  ];

  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        {carouselImages.map((img, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="relative">
              <Image
                src={img}
                alt="Carousel image"
                className="object-cover h-[200px] sm:h-auto w-full"
                sizes="100vw"
                priority
                quality={100}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
