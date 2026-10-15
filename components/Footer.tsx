import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <span className="font-serif text-2xl font-bold text-stone-100 tracking-tight">
              КВАРТА
            </span>
            <p className="mt-1 text-stone-400">
              Микрообжарка кофе в Минске. Основатели — Аня и Дмитрий.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-stone-300">
            <span>ул. Короля, 9</span>
            <span>Пн–Пт 8:00–20:00 · Сб–Вс 10:00–18:00</span>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2019–{new Date().getFullYear()} Обжарка «Кварта». Свежесть с 1 по 3 день.</p>
          <p>Сайт собран для тестового задания · Next.js, Tailwind, Supabase</p>
        </div>
      </div>
    </footer>
  );
}