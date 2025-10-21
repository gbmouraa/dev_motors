"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth-context";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  name: z.string().nonempty("Campo obrigátorio*"),
  email: z.email("Insira um email válido*"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const { handleEmail, handleName } = useContext(AuthContext);
  const router = useRouter();

  // TODO: add transitions
  const onSubmit = ({ name, email }: FormData) => {
    handleName(name);
    handleEmail(email);
    router.push("register/password");
  };

  return (
    <section className="bg-white w-fit mx-auto py-10 -translate-y-16 sm:-translate-y-[40%] rounded-lg px-8 shadow">
      <div>
        <h1 className="text-2xl mb-5">Crie uma conta com seu e-mail</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-96">
          <Input
            type="text"
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
            register={register}
            error={errors.name?.message}
          />
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Digite seu email"
            register={register}
            error={errors.email?.message}
          />
          <small className="text-gray-500 block my-7 text-xs">
            Ao me cadastrar, eu declaro ter ciência de que sete cadastro é
            somente para maiores de 18 anos.
          </small>
          <button
            type="submit"
            className="cursor-pointer block mt-3 text-white bg-red-500 text-xs p-3 font-semibold rounded-xl hover:opacity-70 transition-opacity"
          >
            {/* TODO: add pending to improve style */}
            Avançar
          </button>
        </form>
        <p className="text-center mt-8 text-xs font-medium text-gray-600">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}
