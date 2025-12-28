"use client";

import { useContext, useTransition } from "react";
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

  const { login } = useContext(AuthContext);

  const navigate = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSubmit = ({ email, password }: FormData) => {
    startTransition(async () => {
      await login(email, password).then(() => {
        navigate.push("/dashboard");
      });
    });
  };

  return (
    <div className="px-3 md:px-0">
      <section className="bg-white w-full max-w-[456px] mx-auto py-10 -translate-y-16 sm:-translate-y-[40%] rounded-lg px-8 shadow">
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
              className="cursor-pointer flex justify-center mt-3 text-white bg-red-500 text-xs py-3 w-18 font-semibold rounded-xl hover:opacity-70 transition-opacity"
            >
              {isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-red-500"></div>
              ) : (
                "Entrar"
              )}
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
    </div>
  );
}
