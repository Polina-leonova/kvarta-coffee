"use client";

import Image from "next/image";
import { Coffee, ArrowRight } from "lucide-react";

export interface CoffeeItem {
  id: string;
  name: string;
  country: string;
  notes: string[];
  roastLevel: string;
  weight: string;
  price: number;
  image: string;
  recommendation: string;
}

export const PRODUCTS: CoffeeItem[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    country: "Эфиопия",
    notes: ["Цветочный", "Бергамот", "Лёгкий чайный баланс"],
    roastLevel: "Светлая обжарка",
    weight: "250 г",
    price: 32,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=600",
    recommendation: "Для воронки, фильтра и чашки",
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    country: "Колумбия",
    notes: ["Сладкая карамель", "Красное яблоко", "Сбалансированный"],
    roastLevel: "Средняя обжарка",
    weight: "250 г",
    price: 29,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    recommendation: "Универсально: фильтр, чашка, гейзер",
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    country: "Бразилия",
    notes: ["Жареный орех", "Тёмный шоколад", "Низкая кислотность"],
    roastLevel: "Под эспрессо",
    weight: "250 г",
    price: 26,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=600",
    recommendation: "Идеально в эспрессо, турку и с молоком",
  },
  {
    id: "drips",
    name: "Дрип-пакеты (Ассорти)",
    country: "Сеты из 3 стран",
    notes: ["10 пакетов", "Разные сорта", "Заварить в любой чашке"],
    roastLevel: "Свежий помол в азотной среде",
    weight: "10 штук",
    price: 18,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    recommendation: "Для офиса, поездок и быстрых утр",
  },
];

interface CatalogProps {
  onSelectProduct?: (productName: string) => void;
}

export default function Catalog({ onSelectProduct }: CatalogProps) {
  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Заголовок каталога */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              ассортимент мастерской
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              Свежее зерно этого четверга
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-xs">
            Цены в белорусских рублях. Помол под ваш способ заваривания сделаем бесплатно.
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FBF9F5] rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:border-stone-400/80 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Фотография пачки/зерна */}
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-700">
                    {item.weight}
                  </div>
                </div>

                {/* Текстовая часть */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    {item.roastLevel}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-normal text-stone-900 group-hover:text-amber-950 transition-colors">
                    {item.name}
                  </h3>

                  {/* Дескрипторы вкуса */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/60"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-stone-500 leading-snug">
                    {item.recommendation}
                  </p>
                </div>
              </div>

              {/* Низ карточки: цена и кнопка */}
              <div className="p-5 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    {item.price} BYN
                  </span>
                </div>

                <a
                href="#order"
                onClick={() => onSelectProduct?.(item.name)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 active:scale-95 transition-all"
                >
                Заказать
                <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}