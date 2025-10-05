import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-connection";
import { FormData } from "@/utils/car-schema";
import { UserProps } from "@/context/auth-context";
import { deleteCarImage } from "./storage";
import { CarProps } from "@/types/car";

export type ImagesProps = {
  name: string;
  uid: string;
  url: string;
};

type CarActionsParams = {
  data: FormData;
  images: ImagesProps[];
  user: UserProps;
  carId: string;
  imagesToDelete: { name: string; uid: string }[];
};

type createCarParams = Omit<CarActionsParams, "carId" | "imagesToDelete">;

export const createCar = async (params: createCarParams) => {
  const documentData = {
    ...params.data,
    images: params.images,
    owner: params.user.name,
    uid: params.user.uid,
    created: new Date(),
  };

  try {
    await addDoc(collection(db, "cars"), {
      ...documentData,
    });
    console.log("Carro cadastrado com sucesso.");
  } catch (err) {
    console.error("Erro ao cadastrar carro:", err);
    throw new Error("Erro ao salvar carro no Firestore");
  }
};

export const updateCar = async (params: CarActionsParams) => {
  const docRef = doc(db, "cars", params.carId);

  const documentData = {
    ...params.data,
    images: params.images,
  };

  try {
    await updateDoc(docRef, {
      ...documentData,
    });

    if (params.imagesToDelete.length > 0) {
      await deleteCarImage(params.imagesToDelete);
    }

    console.log("Dados atualizados com sucesso");
  } catch (err) {
    console.error("Erro ao atualizar carros:", err);
    throw new Error("Erro ao atualizar dados");
  }
};

export const getCars = async (user: UserProps) => {
  const docRef = collection(db, "cars");
  const q = query(
    docRef,
    where("uid", "==", user.uid),
    orderBy("created", "asc")
  );

  try {
    const querySnapshot = await getDocs(q);

    const carsList = querySnapshot.docs.map((car) => ({
      id: car.id,
      name: car.data().name,
      model: car.data().model,
      year: car.data().year,
      km: car.data().km,
      city: car.data().city,
      price: car.data().price,
      images: car.data().images,
    }));

    return carsList as CarProps[];
  } catch (err) {
    console.error("Erro ao buscar dados no banco de dados:", err);
  }
};
