import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase-connection";
import { FormData } from "@/utils/car-schema";
import { UserProps } from "@/context/auth-context";
import { deleteCarImage } from "./storage";
import { CarItemProps, CarProps } from "@/types/car";

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

export const getUserCars = async (userUid: string) => {
  const docRef = collection(db, "cars");
  const q = query(
    docRef,
    where("uid", "==", userUid),
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

    return carsList as CarItemProps[];
  } catch (err) {
    console.error("Erro ao buscar dados no banco de dados:", err);
  }
};

export const getCars = async (userUid?: string) => {
  const docsRef = collection(db, "cars");
  const q = userUid
    ? query(docsRef, where("uid", "!=", userUid))
    : query(docsRef, limit(10));

  try {
    const querySnapshot = await getDocs(q);

    const carList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      model: doc.data().model,
      year: doc.data().year,
      km: doc.data().km,
      city: doc.data().city,
      price: doc.data().price,
      images: doc.data().images,
      category: doc.data().category,
    }));

    return carList as CarItemProps[];
  } catch (err) {
    console.error("Erro ao carregar carros:", err);
  }
};

export const getCar = async (carId: string) => {
  const docRef = doc(db, "cars", carId);

  try {
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const carData = {
        id: snapshot.id,
        name: snapshot.data().name,
        model: snapshot.data().model,
        year: snapshot.data().year,
        km: snapshot.data().km,
        city: snapshot.data().city,
        price: snapshot.data().price,
        images: snapshot.data().images,
        description: snapshot.data().description,
        phone: snapshot.data().phone,
        owner: snapshot.data().owner,
        category: snapshot.data().category,
        uid: snapshot.data().uid,
      };

      return carData as CarProps;
    }
  } catch (err) {}
};

export const addCarToFavorites = async (carId: string, userUid: string) => {
  const docRef = doc(db, "users", userUid);

  try {
    await updateDoc(docRef, {
      favoriteCars: arrayUnion(carId),
    });
  } catch (err) {}
};

export const removeCarFromFavorites = async (carId: string, userId: string) => {
  const docRef = doc(db, "users", userId);

  try {
    await updateDoc(docRef, {
      favoriteCars: arrayRemove(carId),
    });
  } catch (err) {}
};

export const getFavoriteCarsID = async (userUid: string) => {
  const docRef = doc(db, "users", userUid);

  try {
    const snapshot = await getDoc(docRef);
    const favoriteCars = snapshot?.data()?.favoriteCars ?? [];
    return favoriteCars;
  } catch (err) {
    return [];
  }
};

export const getFavoritesCars = async (userUid: string) => {
  try {
    const carsIDsToFetch = await getFavoriteCarsID(userUid);

    const carsRef = collection(db, "cars");
    const q = query(carsRef, where("__name__", "in", carsIDsToFetch));

    const querySnapshot = await getDocs(q);
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      model: doc.data().model,
      year: doc.data().year,
      km: doc.data().km,
      city: doc.data().city,
      price: doc.data().price,
      images: doc.data().images,
    }));

    return cars as CarItemProps[];
  } catch (err) {}
};

export const getCarsByCategory = async (category: string) => {
  try {
    const carsRef = collection(db, "cars");
    const q = query(carsRef, where("category", "==", category));

    const querySnapshot = await getDocs(q);

    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      model: doc.data().model,
      year: doc.data().year,
      km: doc.data().km,
      city: doc.data().city,
      price: doc.data().price,
      images: doc.data().images,
    }));

    return cars as CarItemProps[];
  } catch (err) {}
};

export const getCarBySearch = async (carModel: string) => {
  try {
    const searchTerm = carModel.toLowerCase();

    const q = query(collection(db, "cars"));
    const querySnapshot = await getDocs(q);

    const cars = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        model: doc.data().model,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
      }))
      .filter((car) => {
        const name = car.name.toLowerCase();
        const words = name.split("/[s-_.]+/");

        return words.some((word: string) => word.includes(searchTerm));
      });

    return cars as CarItemProps[];
  } catch (err) {}
};
