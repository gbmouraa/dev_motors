import { Header } from "@/components/header";
import React from "react";
import { Categories } from "../../components/categories";
import { RecomendedCars } from "../../components/recomended-cars";
import { Container } from "../../components/container";

export default function CarPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#ECEDF2] min-h-[100vh] pb-10">
      <Header />
      {children}
      <Container>
        <div className="-mt-10">
          <RecomendedCars />
        </div>
        <Categories />
      </Container>
    </main>
  );
}
