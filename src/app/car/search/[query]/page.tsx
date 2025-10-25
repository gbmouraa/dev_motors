import { Container } from "@/components/container";
import { CarItemProps } from "@/types/car";
import { CarItem } from "@/components/car-item";
import { getCarBySearch } from "@/lib/firebase/car";
import { BreadCrumbs } from "../../_components/bread-crumbs";

type Props = {
  params: { query: string };
};

export default async function SearchCar({ params }: Props) {
  const { query } = await params;

  const cars: CarItemProps[] | undefined = await getCarBySearch(
    decodeURIComponent(query)
  );

  if (!cars) {
    return <div>Falha ao carregar carros, tente novamente mais tarde</div>;
  } else if (cars.length === 0) {
    return <div>Desculpe, não encotramos o carro que você procura</div>;
  }

  return (
    <>
      <main className="bg-[#ECEDF2] min-h-[calc(100vh-56px)] pb-10">
        <Container>
          <BreadCrumbs
            route="Carros"
            query={decodeURIComponent(query).toUpperCase()}
          />
          {cars.length > 0 ? (
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
          ) : (
            <p>Desculpe não encotramos o carro que você procura</p>
          )}
        </Container>
      </main>
    </>
  );
}
