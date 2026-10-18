import { MapPin, Clock, Truck, ShieldCheck } from "lucide-react";

export default function LocationDelivery() {
  return (
    <section id="contacts" className="py-16 sm:py-24 border-b border-stone-200/60 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Заголовок */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            где забрать и как получить
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Самовывоз на Короля и доставка по Минску
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Вы можете зайти к нам в гости за пачкой сразу после обжарки или получить кофе курьером по пятницам.
          </p>
        </div>

        {/* 2 колонки: Самовывоз vs Доставка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Колонка 1: Мастерская */}
          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mb-6">
                <MapPin className="w-5 h-5" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                самовывоз
              </span>
              <h3 className="mt-1 font-serif text-2xl text-stone-900">
                Мастерская на ул. Короля, 9
              </h3>

              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                Здесь мы жарим зерно, фасуем заказы и всегда рады гостям. Можно понюхать зерно, выбрать сорт вживую и обсудить рецепты заваривания.
              </p>

              <div className="mt-6 pt-6 border-t border-stone-100 space-y-2 text-sm text-stone-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span><strong>Понедельник – Пятница:</strong> 8:00 – 20:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span><strong>Суббота – Воскресенье:</strong> 10:00 – 18:00</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-stone-500 bg-stone-50/80 p-3.5 rounded-xl border-l-2 border-amber-700">
                 Самовывоз всегда бесплатный. Готовы выдать заказ в любое рабочее время мастерской.
            </div>
          </div>

          {/* Колонка 2: Доставка курьером */}
          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mb-6">
                <Truck className="w-5 h-5" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                курьерская доставка
              </span>
              <h3 className="mt-1 font-serif text-2xl text-stone-900">
                По Минску — каждую пятницу
              </h3>

              <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                Обжарив кофе в четверг, в пятницу утром мы передаем его курьеру. Вы получаете кофе свежайшим прямо на дом или в офис к выходным.
              </p>

              <div className="mt-6 pt-6 border-t border-stone-100 space-y-3 text-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-stone-600">Заказ от 50 BYN:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">Бесплатно</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-stone-600">По кофейной подписке:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">Бесплатно</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-stone-600">Заказ до 50 BYN:</span>
                  <span className="font-medium text-stone-900">6 BYN по городу</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-stone-500 bg-stone-50/80 p-3.5 rounded-xl border-l-2 border-amber-700">
                Курьер предварительно звонит за 30 минут до прибытия. Оплата при получении.
            </div>
          </div>

        </div>
        
        {/* Интерактивная карта мастерской с точными координатами Короля, 9 */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <div className="p-4 bg-white border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-medium text-stone-800">
              Мастерская «Кварта»: Минск, ул. Короля, 9 (самовывоз)
            </span>
            <a
              href="https://yandex.by/maps/?text=Минск+улица+Короля+9"
              target="_blank"
              rel="noreferrer"
              className="text-amber-800 hover:text-amber-900 font-semibold underline"
            >
              Открыть маршрут в Яндекс.Картах ↗
            </a>
          </div>
          <div className="w-full h-64 sm:h-80 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=27.542023%2C53.902241&z=17&pt=27.542023,53.902241,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Мастерская Кварта на Короля, 9"
            />
          </div>
        </div>

      </div>
    </section>
  );
}