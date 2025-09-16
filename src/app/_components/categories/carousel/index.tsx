import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StaticImageData } from "next/image";

interface CategoriesProps {
  category: string;
  image: StaticImageData;
}
export function CarouselSize({
  categories,
}: {
  categories: CategoriesProps[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {categories.map((item) => (
          <CarouselItem key={item.category} className="basis-40">
            <Link href={`/cars/${item.category}`} key={item.category}>
              <div className="relative h-[160px] after:text-white">
                <Image
                  src={item.image}
                  alt={item.category}
                  priority
                  quality={100}
                  className="w-full object-cover rounded-md"
                  fill
                />
                <span className="absolute bottom-4 z-10 text-white font-medium text-2xl left-3 leading-6 inline-block max-w-[160px] lg:max-w-[200px] break-words">
                  {item.category}
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
