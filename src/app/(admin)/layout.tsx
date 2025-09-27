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
    <main className="bg-sky-50 min-h-[calc(100vh-56px)] pb-10">
      <Header />
      <Container>
        <div className="mt-3">
          <Private>
            <Panel />
            {children}
          </Private>
        </div>
      </Container>
    </main>
  );
}
