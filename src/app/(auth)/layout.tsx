"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/header";
import { ReactNode } from "react";
import { BannerHero } from "./_components/banner-hero";
import { AuthContext } from "../../context/auth-context";
import { Loader } from "../../components/loader";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    return router.push("/dashboard");
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <main className="bg-[#ECEDF2] min-h-[calc(100vh-56px)]">
        <BannerHero />
        {children}
      </main>
    </>
  );
}
