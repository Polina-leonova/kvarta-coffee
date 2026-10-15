"use client";

import { Check, Sparkles, Truck, Coffee } from "lucide-react";

interface SubscriptionProps {
  onSelectSubscription?: () => void;
}

export default function Subscription({ onSelectSubscription }: SubscriptionProps) {
  const perks = [
    "2 пачки по 250 г свежайшей обжарки каждый месяц",
    "Бесплатная доставка курьером прямо до двери по пятницам",
    "Сорта меняются: каждый месяц новые вкусовые открытия",
    "Бесплатный помол под ваш любимый способ заваривания",
    "Можно поставить на паузу или отменить в любой момент",
  ];

  return (
    <section id="subscription" className="py-16 sm:py-24 border-b border-stone-200/60 bg-[#1C1917] text-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Левая часть: Описание ценности */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Главное удобство для дома и офиса</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Кофе дома не должен заканчиваться внезапно
            </h2>

            <p className="mt-5 text-stone-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Подписка «Кварты» — это ваша спокойная гарантия, что каждое утро начнется с ароматной чашки кофе из зерна, пожаренного буквально вчера.
            </p>

            <ul className="mt-8 space-y-3.5">
              {perks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Правая часть: Карточка тарифа */}
          <div className="lg:col-span-5">
            <div className="bg-[#292524] rounded-3xl p-8 sm:p-10 border border-stone-700/80 shadow-2xl relative">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                ежемесячный план
              </span>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-stone-50">
                  54 BYN
                </span>
                <span className="text-stone-400 text-sm">/ месяц</span>
              </div>

              <p className="mt-3 text-xs text-stone-400 pb-6 border-b border-stone-700">
                Включает 500 г кофе (2 сорта по 250 г) + курьерскую доставку по Минску.
              </p>

              <div className="py-6 space-y-3 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Обжарка в четверг под вашу подписку</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Доставка в первую пятницу месяца</span>
                </div>
              </div>

              <a
                href="#order"
                onClick={onSelectSubscription}
                className="w-full inline-flex justify-center items-center py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-all shadow-md active:scale-98"
              >
                Оформить подписку
              </a>

              <p className="mt-4 text-center text-[11px] text-stone-400">
                Без предоплаты на сайте. Менеджер свяжется для уточнения деталей.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}