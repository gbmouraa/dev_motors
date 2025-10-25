import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { getCarsByCategory } from "@/lib/firebase/car";
import { CarItem } from "@/components/car-item";
import { CarItemProps } from "@/types/car";
import { formatCategorySlug } from "@/utils/format-category-slug";
import { BreadCrumbs } from "../../_components/bread-crumbs";

type Props = {
  params: { category: string };
};

export default async function Category({ params }: Props) {
  const { category } = await params;
  const cars: CarItemProps[] | undefined = await getCarsByCategory(category);
  const categoryText = formatCategorySlug(category);

  if (!cars) {
    return <div>Falha ao carregar carros, tente novamente mais tarde</div>;
  } else if (cars.length === 0) {
    return <div>Desculpe, não encotramos o carro que você deseja...</div>;
  }

  return (
    <>
      <main className="bg-[#ECEDF2] min-h-[calc(100vh-56px)] pb-10">
        <Container>
          <BreadCrumbs route="Categorias" category={categoryText} />
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
