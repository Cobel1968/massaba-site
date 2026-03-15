import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StatusTicker from "@/components/StatusTicker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Massaba Global Consultancy | UAE",
  description: "Bespoke global consultancy services powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <StatusTicker />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
