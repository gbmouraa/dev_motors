import React from "react";
import { Private } from "./_components/private";
import { Header } from "@/components/header";
import { Container } from "@/components/container";
import { Panel } from "./_components/panel";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#ECEDF2] min-h-[100vh] pb-10">
      <Header />
      <Container>
        <div className="mt-3">
          <Panel />
          <Private>{children}</Private>
        </div>
      </Container>
    </main>
  );
}
