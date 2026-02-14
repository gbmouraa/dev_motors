"use client";

import { useContext, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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

  const { name, email, signIn } = useContext(AuthContext);
  const [isPending, startTransition] = useTransition();

  const onSubmit = ({ password }: FormData) => {
    startTransition(async () => {
      await signIn(name, email, password);
      localStorage.removeItem("@dev_carros_registration_data"); // Clear localStorage on successful registration
    });
  };

  return (
    <div className="px-3 md:px-0">
      <section className="bg-white w-full max-w-[456px] mx-auto py-10 -translate-y-16 sm:-translate-y-[40%] rounded-lg px-8 shadow">
        <div>
          <h1 className="text-2xl mb-5">Crie uma senha para sua conta</h1>
          <a
            href="/register"
            className="flex gap-x-2 text-xs items-center mb-5 text-gray-500 hover:text-gray-900"
          >
            {" "}
            <div className="w-4 h-4 rounded-full border border-gray-500 flex justify-center items-center">
              <ChevronLeft size={12} />
            </div>
            Voltar
          </a>
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
              className="cursor-pointer flex justify-center mt-3 text-white bg-red-500 text-xs py-3 w-22 font-semibold rounded-xl hover:opacity-70 transition-opacity"
            >
              {isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-red-500"></div>
              ) : (
                "Criar conta"
              )}
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
    </div>
  );
}
