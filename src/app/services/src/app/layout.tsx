import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google"; // Added Merriweather
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Setting up the Serif font
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} ${merriweather.variable}`}
    >
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}