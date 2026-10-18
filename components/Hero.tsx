import Image from "next/image";
import RoastTimer from "./RoastTimer";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-stone-200/80 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Левая колонка */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <div>
              {/* Таймер обжарки */}
              <div className="mb-4">
                <RoastTimer />
              </div>

              {/* Выверенный, строгий и сильный заголовок */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.12] text-stone-900 tracking-tight">
                Кофе свежей обжарки.
                <span className="block text-stone-600 font-light mt-1">
                  Прямо в чашку, а не на склад.
                </span>
              </h1>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-stone-600 max-w-lg font-light">
                Мы — Аня и Дмитрий. С 2019 года обжариваем спешелти зерно в Минске на Короля, 9 партиями строго по 5 кг. Зерно попадает к вам на 1–3 день после ростера — когда вкус раскрывается на пике.
              </p>

              {/* Кнопки действий */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 text-stone-50 text-xs sm:text-sm font-medium hover:bg-stone-800 transition-all shadow-sm active:scale-95"
                >
                  <span>Выбрать сорт кофе</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#subscription"
                  className="inline-flex items-center px-6 py-3.5 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-medium border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all active:scale-95 shadow-2xl"
                >
                  Подписка на месяц
                </a>
              </div>
            </div>

            {/* Метрики внизу — идеально синхронизированы с низом фотографии */}
            <div className="mt-12 pt-6 border-t border-stone-200 grid grid-cols-3 gap-6">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">5 кг</p>
                <p className="text-[11px] text-stone-500 mt-1 uppercase tracking-wider">партия обжарки</p>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">1–3 дня</p>
                <p className="text-[11px] text-stone-500 mt-1 uppercase tracking-wider">свежесть у вас</p>
              </div>
              <div className="border-l border-stone-200 pl-6">
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">54 BYN</p>
                <p className="text-[11px] text-stone-500 mt-1 uppercase tracking-wider">подписка / мес</p>
              </div>
            </div>

          </div>

          {/* Правая колонка: органичное, теплое фото в тон сайту (без плашек) */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000"
                alt="Уютная спешелти кофейня в теплых тонах"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}