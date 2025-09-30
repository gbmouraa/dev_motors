"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const schema = z
  .object({
    password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { name, email, sigin } = use(AuthContext);

  const router = useRouter();

  const onSubmit = async ({ password }: FormData) => {
    await sigin(name, email, password);
  };

  if (name === "" || email === "") router.push("/register");

  return (
    <section className="bg-white w-fit mx-auto py-10 -translate-y-16 sm:-translate-y-[40%] rounded-lg px-8 shadow">
      <div>
        <h1 className="text-2xl mb-5">Crie uma senha para sua conta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-96">
          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            register={register}
            error={errors.password?.message}
            password
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirme sua senha"
            placeholder="Confirme sua senha"
            register={register}
            error={errors.confirmPassword?.message}
            password
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
