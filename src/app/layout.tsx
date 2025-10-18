import AuthContextProvider from "@/context/auth-context";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Backpack } from "lucide-react";

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
        <body className={` antialiased`}>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "white",
                color: "#4a5565",
                border: "1px solid #d1d5dc ",
                borderRadius: "8px",
              },
            }}
          />
        </body>
      </AuthContextProvider>
    </html>
  );
}
