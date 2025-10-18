import { getCar } from "@/lib/firebase/car";
import { Car } from "../_components/car";

type Props = {
  params: { id: string };
};

export default async function CarDetail({ params }: Props) {
  const { id } = await params;
  const car = await getCar(id);

  if (car) {
    return <Car data={car} />;
  }

  return <div></div>;
}
