import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-connection";
import { CarForm } from "../../_components/car-form";
import { CarProps } from "@/types/car";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Carro | Dev Carros",
  description: "Edite as informações de um carro",
};

const getCar = async (documentId: string): Promise<CarProps | null> => {
  const docRef = doc(db, "cars", documentId);

  try {
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    const { created, ...restOfData } = data;

    return { id: snapshot.id, ...(restOfData as CarProps) };
  } catch {
    throw new Error("Failed to fetch data");
  }
};

export default async function EditCar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);

  if (!car) {
    return <div>Não é possivél editar o carro no momento</div>;
  }

  return <CarForm carToEdit={car as CarProps} />;
}
