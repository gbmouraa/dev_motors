import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "./firebase-connection";
import { CarImageProps } from "@/types/car";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteCarImage = async (
  imagesToDelete: { name: string; uid: string }[]
) => {
  try {
    await Promise.all(
      imagesToDelete.map(async (img) => {
        const imgRef = ref(storage, `images/${img.uid}/${img.name}`);
        await deleteObject(imgRef);
      })
    );
  } catch (err) {
    console.error("Erro ao deletar imagem do banco:", err);
  }
};

export const uploadImages = async (carImages: CarImageProps[]) => {
  const imagesToUpload = carImages.filter((img) => img.isNew === true);
  const imagesToKeep = carImages.filter((img) => !img.isNew && !img.toDelete);

  const uploadedImages = await Promise.all(
    imagesToUpload.map(async (img) => {
      const uploadRef = ref(storage, `images/${img.uid}/${img.name}`);

      const snapshot = await uploadBytes(uploadRef, img.file!);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return {
        name: img.name,
        uid: img.uid,
        url: downloadUrl,
      };
    })
  );

  const imagesList = [...imagesToKeep, ...uploadedImages].map((img) => {
    return {
      name: img.name,
      uid: img.uid,
      url: img.url!,
    };
  });

  return imagesList;
};

export const deleteCar = async (
  docId: string,
  images: { name: string; uid: string }[]
) => {
  const docRef = doc(db, "cars", docId);

  try {
    await deleteDoc(docRef);
    await deleteCarImage(images);
  } catch (err) {
    console.log("Erro ao deletar carro do banco:", err);
  }
};
