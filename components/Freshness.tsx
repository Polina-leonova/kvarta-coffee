import { Calendar, Flame, PackageCheck, HeartHandshake } from "lucide-react";

export default function Freshness() {
  const steps = [
    {
      day: "Четверг",
      badge: "День обжарки",
      title: "Партии строго по 5 кг",
      desc: "Мы не жарим зерно тоннами впрок. В четверг загружаем ростер ровно под то количество заказов, которое собрали за неделю.",
      icon: Flame,
    },
    {
      day: "Пятница",
      badge: "День доставки",
      title: "Развоз по Минску",
      desc: "Упаковываем в пачки с клапаном дегазации и сразу отправляем курьером по городу либо ждем вас в гости на Короля, 9.",
      icon: PackageCheck,
    },
    {
      day: "1–3 день",
      badge: "Пик вкуса",
      title: "В вашей чашке",
      desc: "Кофе только что закончил активную дегазацию. В этот момент его аромат максимален: никакой пыльной горечи лежалого зерна.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="freshness" className="py-16 sm:py-24 border-b border-stone-200/60 bg-[#F4EFE6]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Заголовок секции */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
            честный цикл зерна
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Почему свежесть — это не маркетинг, а физика
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Большинство пачек из супермаркета пожарены 3–6 месяцев назад. К этому времени эфирные масла уже окислились. Мы привозим зерно, когда оно на пике своей жизни.
          </p>
        </div>

        {/* 3 карточки ритма */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-medium text-stone-900">
                      {step.day}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/50">
                      <Icon className="w-3.5 h-3.5 text-amber-700" />
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>Этап 0{idx + 1}</span>
                  <span>«Кварта» Минск</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}