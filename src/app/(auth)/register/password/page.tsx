"use client";

import { use } from "react";
import { AuthContext } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { email, sigin } = use(AuthContext);

  const onSubmit = async ({ password, confirmPassword }: FormData) => {
    await sigin(email, password);
  };

  return (
    <section className="bg-white w-fit mx-auto py-10 -translate-y-16 rounded-lg px-8 shadow">
      <div>
        <h1 className="text-2xl mb-5">Crie uma senha para sua conta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-96">
          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            register={register}
            // error={errors.name?.message}
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            register={register}
            // error={errors.email?.message}
          />
          <small className="text-gray-500 block my-7 text-xs">
            Ao me cadastrar, eu declaro ter ciência de que sete cadastro é
            somente para maiores de 18 anos.
          </small>
          <button
            type="submit"
            className="cursor-pointer block mt-3 text-white bg-red-500 text-xs p-3 font-semibold rounded-xl hover:opacity-70 transition-opacity"
          >
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
