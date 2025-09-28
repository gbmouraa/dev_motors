import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CarItem } from "@/components/car-item";

async function getCars() {
  const docRef = collection(db, "cars");
  const q = query(docRef, orderBy("created", "asc"));

  const querySnapshot = await getDocs(q);

  const carsList = querySnapshot.docs.map((car) => ({
    name: car.data().name,
    model: car.data().model,
    year: car.data().year,
    km: car.data().km,
    city: car.data().city,
    price: car.data().price,
    images: car.data().images,
    id: car.id,
  }));

  return carsList;
}

export default async function Dashboard() {
  const cars = await getCars();

  if (cars.length === 0)
    return <section>Você não possui nenhum carro cadastrado</section>;

  return (
    <section className="flex flex-wrap flex-col gap-3 md:flex-row">
      {cars.map((item) => (
        <CarItem
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
    </section>
  );
}
