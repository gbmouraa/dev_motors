import { Header } from "@/components/header";
import React from "react";

export default function CarPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#ECEDF2] min-h-[100vh] pb-10">
      <Header />
      {children}
    </main>
  );
}
