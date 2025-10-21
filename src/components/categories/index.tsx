import { StaticImageData } from "next/image";
import { CarouselSize } from "./carousel";

import eletricoImg from "./assets/eletrico.webp";
import hatchImg from "./assets/hatch.jpg";
import picapeImg from "./assets/picape.webp";
import sedanImg from "./assets/sedan.webp";
import suvImg from "./assets/suv.webp";

export interface CategoriesProps {
  category: string;
  image: StaticImageData;
  slug: string;
}

export function Categories() {
  const categories: CategoriesProps[] = [
    { category: "Carros elétricos", image: eletricoImg, slug: "eletrico" },
    { category: "Hatches", image: hatchImg, slug: "hatch" },
    { category: "Picapes", image: picapeImg, slug: "picape" },
    { category: "Sedans", image: sedanImg, slug: "sedan" },
    { category: "SUVs", image: suvImg, slug: "suv" },
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
