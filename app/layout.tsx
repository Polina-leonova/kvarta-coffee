import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кварта — микрообжарка кофе в Минске",
  description: "Обжариваем по четвергам партиями по 5 кг. Свежее зерно приезжает к вам на 1–3 день после обжарки.",
  openGraph: {
    title: "Кварта — микрообжарка кофе в Минске",
    description: "Обжариваем по четвергам партиями по 5 кг. Свежее зерно на 1–3 день.",
    locale: "ru_BY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${lora.variable} scroll-smooth`}>
      <body className="font-sans bg-[#FBF9F5] text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}