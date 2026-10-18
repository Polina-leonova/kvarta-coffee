import Image from "next/image";
import RoastTimer from "./RoastTimer";

export default function Hero() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Динамический бейдж с таймером до четверга */}
        <RoastTimer />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Левая колонка: Текст и призыв */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-stone-950 tracking-tight">
              Кофе, который обжаривают для вас,{" "}
              <span className="italic font-normal text-stone-600">а не на склад.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-600 max-w-xl">
              Мы — Аня и Дмитрий. С 2019 года обжариваем кофе в Минске маленькими
              партиями по 5 кг. Зерно попадает к вам уже на 1–3 день после
              ростера — ровно в тот момент, когда букет раскрывается на пике.
            </p>

            {/* Кнопки */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3.5 sm:gap-4 sm:items-center">
              <a
                href="#catalog"
                className="inline-flex justify-center items-center px-7 py-3.5 rounded-full bg-stone-900 text-stone-100 text-sm font-medium hover:bg-stone-800 transition-all shadow hover:shadow-md"
              >
                Выбрать сорт
              </a>
              <a
                href="#subscription"
                className="inline-flex justify-center items-center px-7 py-3.5 rounded-full bg-[#F4EFE6] text-stone-800 border border-stone-300 text-sm font-medium hover:bg-[#eae4d8] transition-all"
              >
                Оформить подписку
              </a>
            </div>

            {/* Мягкие микро-факты */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">5 кг</p>
                <p className="text-xs text-stone-500 mt-0.5">партия обжарки</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">1–3 дня</p>
                <p className="text-xs text-stone-500 mt-0.5">возраст зерна у вас</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">54 BYN</p>
                <p className="text-xs text-stone-500 mt-0.5">подписка в месяц</p>
              </div>
            </div>
          </div>

          {/* Правая колонка: Атмосферное фото */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000"
                alt="Уютная кофейная мастерская Кварта в Минске"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 text-stone-900 shadow-sm">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">Мастерская на Короля, 9</p>
                <p className="text-xs sm:text-sm font-medium mt-0.5">Заходите познакомиться, забрать свежую пачку или просто на чашку.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}