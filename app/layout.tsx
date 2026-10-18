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
  description:
    "Обжариваем по четвергам партиями по 5 кг. Свежее зерно приезжает к вам на 1–3 день после обжарки. Самовывоз на ул. Короля, 9.",
  keywords: [
    "кофе минск",
    "обжарка кофе минск",
    "свежий кофе",
    "подписка на кофе минск",
    "спешелти кофе",
    "кварта кофе",
  ],
  authors: [{ name: "Аня и Дмитрий · Обжарка Кварта" }],
  openGraph: {
    title: "Кварта — микрообжарка кофе в Минске",
    description:
      "Обжариваем по четвергам партиями по 5 кг. Доставка по пятницам. Зерно на 1–3 день у вас дома.",
    url: "https://kvarta-coffee-silk.vercel.app/", 
    siteName: "Обжарка «Кварта»",
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Кофейная мастерская «Кварта» в Минске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кварта — кофе свежей обжарки в Минске",
    description: "Жарим по четвергам по 5 кг. Свежее зерно на 1–3 день.",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200&h=630",
    ],
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