import AuthContextProvider from "@/context/auth-context";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devmotors - Compre, venda carros em todo Brasil",
  description:
    "Plataforma para vendedores e compradores de carros usados no Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={` antialiased`}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
