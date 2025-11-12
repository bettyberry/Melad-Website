// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/components/providers"; // ✅ Client wrapper
import Header from "@/components/header";
import Footer from "@/components/footer";
import ClientLayout from "@/components/client-layout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ብራና - Brana",
  description: "Modern and elegant website for ብራና",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
