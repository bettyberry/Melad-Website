// app/layout.tsx (server component)
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import ClientLayout from "@/components/client-layout"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ብራና - Brana",
  description: "Modern and elegant website for ብራና",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
