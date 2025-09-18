import { Header } from "../../components/header";
import { ReactNode } from "react";
import { BannerHero } from "./_components/banner-hero";

export const metadata = {
  title: "Devmotors - Login",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-sky-50 min-h-[calc(100vh-56px)]">
        <BannerHero />
        {children}
      </main>
    </>
  );
}
