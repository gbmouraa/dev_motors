import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ChevronRight } from "lucide-react";
import { getCarsByCategory } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";
import { CarItemProps } from "@/types/car";
import { formatCategorySlug } from "@/utils/format-category-slug";

type Props = {
  params: { category: string };
};

export default async function Category({ params }: Props) {
  const { category } = await params;
  const cars: CarItemProps[] | undefined = await getCarsByCategory(category);
  const categoryText = formatCategorySlug(category);

  if (!cars) {
    return <div>Falha ao carregar carros, tente novamente mais tarde</div>;
  }

  return (
    <>
      <Header />
      <main className="bg-[#ECEDF2] min-h-[calc(100vh-56px)] pb-10">
        <Container>
          <p className="text-gray-500 font-extralight text-sm flex items-center gap-x-px py-6">
            Home <ChevronRight size={14} /> Categorias{" "}
            <ChevronRight size={14} /> {categoryText}
          </p>
          <section className="flex w-full flex-col">
            <div className="flex flex-col gap-3 md:flex-row">
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
                />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
