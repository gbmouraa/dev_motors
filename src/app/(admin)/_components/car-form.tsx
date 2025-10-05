"use client";

import { ChangeEvent, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, FormData } from "@/utils/car-schema";
import { AuthContext } from "@/context/auth-context";
import { v4 as uuidV4 } from "uuid";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/input";
import { CategorySelect } from "@/components/select";
import { TextArea } from "@/components/text-area";
import type { CarImageProps } from "@/types/car";
import { CarProps } from "@/types/car";
import { createCar, updateCar } from "@/lib/firebase/car";
import { uploadImages } from "@/lib/firebase/storage";

interface CarFormProps {
  carToEdit?: CarProps;
}

export function CarForm({ carToEdit }: CarFormProps) {
  const [carImages, setCarImages] = useState<CarImageProps[]>(
    carToEdit
      ? carToEdit.images.map((img) => ({
          ...img,
          isNew: false,
        }))
      : []
  );
  const [imagesToDelete, setImagesToDelete] = useState<
    { name: string; uid: string }[]
  >([]);

  useEffect(() => {
    return () => {
      carImages.forEach((img) => {
        if (img.previewUrl && img.isNew) {
          try {
            URL.revokeObjectURL(img.previewUrl);
          } catch (err) {}
        }
      });
    };
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(carSchema),
    defaultValues: carToEdit
      ? {
          name: carToEdit.name,
          model: carToEdit.model,
          year: carToEdit.year,
          km: carToEdit.km,
          phone: carToEdit.phone,
          city: carToEdit.city,
          price: carToEdit.price,
          category: carToEdit.category,
          description: carToEdit.description,
        }
      : {
          category: "",
          description: "",
        },
  });

  const { user } = useContext(AuthContext);

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
        isNew: true,
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

    try {
      const images = await uploadImages(carImages);

      const carData = {
        data: data,
        images: images,
        user: user,
      };

      if (carToEdit) {
        const newCarData = {
          ...carData,
          user: user,
          carId: carToEdit.id!,
          imagesToDelete: imagesToDelete,
        };

        try {
          await updateCar(newCarData);
          reset();
          setCarImages([]);
        } catch (err) {
          console.error(err);
        }

        return;
      }

      await createCar(carData);
      reset();
      setCarImages([]);
    } catch (err) {
      console.error("Erro na submissão do formulário:", err);
    }
  };

  const handleDeleteImage = (image: CarImageProps) => {
    if (!image.isNew) {
      // deletar no banco de dados
      setImagesToDelete((prev) => [...prev, image]);
    }

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
          {carImages.map((img) => (
            <div
              key={img.name}
              className="relative w-full max-w-[200px] min-w-[120px]  h-[140px]"
            >
              <Image
                className="object-cover rounded"
                src={img.previewUrl ? img.previewUrl : img.url!}
                alt="Imagem do carro"
                fill
                quality={100}
              />
              <button
                className="absolute z-10 top-1/2 left-1/2 -translate-1/2 cursor-pointer"
                onClick={() => handleDeleteImage(img)}
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
            label="Telefone com DDD"
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
