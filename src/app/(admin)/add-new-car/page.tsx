"use client";

import { ChangeEvent, useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthContext } from "@/context/auth-context";
import { v4 as uuidV4 } from "uuid";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/input";
import { CategorySelect } from "./_components/select";
import { TextArea } from "./_components/text-area";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../lib/firebase";
import type { CarImageProps } from "@/types/car";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  name: z.string().nonempty("Campo obrigatório*"),
  model: z.string().nonempty("Campo obrigatório*"),
  year: z.string().nonempty("Campo obrigatório*"),
  km: z.string().nonempty("Campo obrigatório*"),
  phone: z.string().nonempty("Campo obrigatório*"),
  city: z.string().nonempty("Campo obrigatório*"),
  price: z.string().nonempty("Campo obrigatório*"),
  category: z.string().nonempty("Campo obrigatório*"),
  description: z.string().nonempty("Campo obrigatório*"),
});

type FormData = z.infer<typeof schema>;

export default function AddNewCar() {
  // preview images
  const [carImages, setCarImages] = useState<CarImageProps[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      description: "",
    },
  });

  const { user } = use(AuthContext);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!user?.uid) return;

    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        alert("Insira uma imagem do tipo jpeg ou png");
        return;
      }

      const imgUid = uuidV4();

      const carImage: CarImageProps = {
        name: imgUid,
        uid: user.uid,
        previewUrl: URL.createObjectURL(image),
        file: image,
      };

      setCarImages((prev) => [...prev, carImage]);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    if (carImages.length === 0) {
      alert("Insira pelo menos uma imagem do carro");
      return;
    }

    const images = await uploadImages();
    addDoc(collection(db, "cars"), {
      name: data.name,
      model: data.model,
      created: new Date(),
      phone: data.phone,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      owner: user.name,
      uid: user.uid,
      images: images,
      city: data.city,
      category: data.category,
    })
      .then(() => {
        console.log("Carro cadastrado com sucesso");
        reset();
        setCarImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImages = async () => {
    const uploadedImages = await Promise.all(
      carImages.map(async (img) => {
        const uploadRef = ref(storage, `ìmages/${img.uid}/${img.name}`);

        const snapshot = await uploadBytes(uploadRef, img.file!);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return {
          name: img.name,
          uid: img.uid,
          url: downloadUrl,
        };
      })
    );

    return uploadedImages;
  };

  const handleDeleteImage = (image: CarImageProps) => {
    const carImagesUpdated = carImages.filter((item) => item !== image);
    setCarImages(carImagesUpdated);
  };

  return (
    <section className="bg-white p-4 py-5 rounded-lg">
      {/* Car images */}
      <div className="mb-6">
        <div className="flex flex-col justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-0 h-0"
            id="inputImage"
          />
          <label
            htmlFor="inputImage"
            className="flex items-center justify-items-start gap-2 cursor-pointer hover:bg-gray-300/80 transition-all hover:text-gray-800 bg-gray-100 w-fit px-2 py-1 text-[13px] rounded text-gray-600 border border-gray-300"
          >
            <Plus size={16} />
            <span className="">Adicionar imagem</span>
          </label>
        </div>
        <div className="mt-3 flex gap-3 w-full  max-w-full overflow-x-auto">
          {carImages.map((item) => (
            <div
              key={item.name}
              className="relative w-full max-w-[200px] min-w-[120px]  h-[140px]"
            >
              <Image
                className="object-cover rounded"
                src={item.previewUrl!}
                alt="Imagem do carro"
                fill
                quality={100}
              />
              <button
                className="absolute z-10 top-1/2 left-1/2 -translate-1/2 cursor-pointer"
                onClick={() => handleDeleteImage(item)}
              >
                <Trash color="#fff" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome do carro"
          placeholder="Ex: Chevrolet Onix"
          type="text"
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <Input
          label="Modelo"
          placeholder="Ex: 1.4 LTZ Aut"
          type="text"
          name="model"
          register={register}
          error={errors.model?.message}
        />
        <div className="flex gap-x-3 w-full flex-col sm:flex-row">
          <Input
            label="Ano"
            placeholder="Ex: 2016/2027"
            type="text"
            name="year"
            register={register}
            error={errors.year?.message}
          />
          <Input
            label="Km rodados"
            placeholder="Ex: 20000"
            type="text"
            name="km"
            register={register}
            error={errors.km?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full flex-col sm:flex-row">
          <Input
            label="Telefone para contato"
            placeholder="Ex: 99 99999-9999"
            type="text"
            name="phone"
            register={register}
            error={errors.phone?.message}
          />
          <Input
            label="Cidade"
            placeholder="Ex: Belo horizonte - MG"
            type="text"
            name="city"
            register={register}
            error={errors.city?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full items-start flex-col sm:flex-row">
          <Input
            label="Preço"
            placeholder="Ex: 60.000,00"
            type="text"
            name="price"
            register={register}
            error={errors.price?.message}
          />
          <div className="flex items-start justify-start flex-col w-full mb-3 sm:mb-0">
            <span className="text-sm font-medium text-gray-600">
              Categoria:
            </span>
            <CategorySelect
              name="category"
              control={control}
              placeholder="Categoria"
              options={[
                { value: "eletrico", label: "Elétrico" },
                { value: "hatch", label: "Hacth" },
                { value: "picape", label: "Picape" },
                { value: "sedan", label: "Sedan" },
                { value: "suv", label: "SUV" },
              ]}
            />
          </div>
        </div>
        <TextArea
          label="Descrição"
          placeholder="Digite a descrição completa sobre o carro"
          name="description"
          control={control}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 cursor-pointer rounded-md"
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}
