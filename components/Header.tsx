import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
            КВАРТА
          </span>
          <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase text-stone-500">
            обжарка кофе · минск
          </span>
        </Link>

        {/* Навигация (для десктопа) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link href="#freshness" className="hover:text-stone-900 transition-colors">
            Свежесть
          </Link>
          <Link href="#catalog" className="hover:text-stone-900 transition-colors">
            Зерно и цены
          </Link>
          <Link href="#subscription" className="hover:text-stone-900 transition-colors">
            Подписка
          </Link>
          <Link href="#contacts" className="hover:text-stone-900 transition-colors">
            Мастерская
          </Link>
        </nav>

        {/* Локация и CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100/80 px-3 py-1.5 rounded-full border border-stone-200">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>ул. Короля, 9</span>
          </div>

          <a
            href="#order"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
          >
            Заказать
          </a>
        </div>

      </div>
    </header>
  );
}