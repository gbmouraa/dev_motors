import { getCar } from "@/lib/firebase/car";
import { Car } from "../_components/car";
import { Container } from "../../../components/container";
import { RecomendedCars } from "../../../components/recomended-cars";
import { Categories } from "../../../components/categories";

type Props = {
  params: { id: string };
};

export default async function CarDetail({ params }: Props) {
  const { id } = await params;
  const car = await getCar(id);

  if (car) {
    return (
      <div>
        <Car data={car} />;
        <Container>
          <div className="-mt-10">
            <RecomendedCars carID={id} />
          </div>
          <Categories />
        </Container>
      </div>
    );
  }

  return <div></div>;
}
