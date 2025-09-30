"use client";

import { use } from "react";
import { AuthContext } from "@/context/auth-context";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.email("Insira um email válido"),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { login } = use(AuthContext);

  const navigate = useRouter();

  const onSubmit = async ({ email, password }: FormData) => {
    await login(email, password).then(() => {
      navigate.push("/dashboard");
    });
  };

  return (
    <section className="bg-white w-fit  mx-auto py-10 -translate-y-16 sm:-translate-y-[40%] rounded-lg px-8 shadow">
      <div className="sm:min-w-[384px]">
        <h1 className="text-2xl mb-5">Entre com seu e-mail</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-96">
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Digite seu email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            register={register}
            error={errors.password?.message}
            password
          />
          <button
            type="submit"
            className="cursor-pointer block mt-3 text-white bg-red-500 text-xs p-3 font-semibold rounded-xl hover:opacity-70 transition-opacity"
          >
            Entrar
          </button>
        </form>
        <p className="text-center mt-8 text-xs font-medium text-gray-600">
          Não possui uma conta?{" "}
          <Link href="/register" className="text-red-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}
