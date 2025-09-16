import { StaticImageData } from "next/image";
import { CarouselSize } from "./carousel";

import eletricoImg from "./assets/eletrico.webp";
import hatchImg from "./assets/hatch.jpg";
import picapeImg from "./assets/picape.webp";
import sedanImg from "./assets/sedan.webp";
import suvImg from "./assets/suv.webp";

interface CategoriesProps {
  category: string;
  image: StaticImageData;
}

export function Categories() {
  const categories: CategoriesProps[] = [
    { category: "Carros elétricos", image: eletricoImg },
    { category: "Hatches", image: hatchImg },
    { category: "Picapes", image: picapeImg },
    { category: "Sedans", image: sedanImg },
    { category: "SUVs", image: suvImg },
  ];

  return (
    <section className="w-full mt-6">
      <p className="text-lg text-gray-600 font-bold">Categorias</p>
      <div className="mt-4 w-full">
        <CarouselSize categories={categories} />
      </div>
    </section>
  );
}
