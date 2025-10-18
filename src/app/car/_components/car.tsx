import { CarProps } from "@/types/car";
import { CarouselSize } from "./carousel";
import { Container } from "@/components/container";
import { DescriptionItem } from "./description-item";
import { formatCurrency } from "@/utils/format-currency";
import { FavoriteButton } from "./favorite-button";

interface CarDataProps {
  data: CarProps;
}

export function Car({ data }: CarDataProps) {
  const carName = data.name.split(" ");

  return (
    <section>
      <div className="w-full flex justify-center">
        <CarouselSize images={data.images} />
      </div>
      <Container>
        <div className="bg-white w-full py-8 px-5 md:px-10 shadow-md rounded-lg md:-translate-y-8 mt-5 md:mt-0 relative">
          <div className="mb-8">
            <p className="uppercase text-3xl mb-1">
              <span className="text-gray-950 font-bold">{carName[0]} </span>
              <span className="text-red-500 font-bold">{carName[1]}</span>
            </p>
            <p className="font-extralight text-gray-500 text-[15px]">
              {data.model}
            </p>
          </div>
          <div className="flex flex-wrap sm:justify-between gap-8 border-b border-gray-200 pb-8">
            <DescriptionItem title="Cidade" text={data.city} />
            <DescriptionItem title="Ano" text={data.year} />
            <DescriptionItem title="KM" text={data.km} />
            <DescriptionItem title="Categoria" text={data.category} />
            <DescriptionItem title="Cor" text="Preto" />
          </div>
          <div className="pt-8">
            <h2 className="text-xs">Descrição do veículo</h2>
            <p className="text-gray-800">{data.description}</p>
          </div>
          <div className="mt-8">
            <p className="text-sm">Valor anunciado</p>
            <span className="text-2xl font-bold">
              {formatCurrency(data.price)}
            </span>
          </div>
          <FavoriteButton carId={data.id!} userUid={data.uid} />
        </div>
      </Container>
    </section>
  );
}
