"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getUtmParams, UtmParams } from "../lib/utm";
import { CheckCircle2, AlertCircle, Loader2, Send, Plus, Minus, Sparkles, PhoneCall } from "lucide-react";

interface OrderFormProps {
  initialInterest?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  count: number;
}

const AVAILABLE_ITEMS: Omit<CartItem, "count">[] = [
  { id: "ethiopia", name: "Эфиопия Иргачеффе", price: 32, weight: "250 г" },
  { id: "colombia", name: "Колумбия Уила", price: 29, weight: "250 г" },
  { id: "brazil", name: "Бразилия Серрадо", price: 26, weight: "250 г" },
  { id: "drips", name: "Дрип-пакеты (Ассорти)", price: 18, weight: "10 шт" },
];

const GRIND_OPTIONS = [
  { id: "beans", label: "В зёрнах (не молоть)" },
  { id: "turka", label: "Для турки" },
  { id: "espresso", label: "Для эспрессо" },
  { id: "moka", label: "Для гейзера" },
  { id: "filter", label: "Для фильтра / воронки" },
  { id: "cup", label: "Для чашки" },
];

export default function OrderForm({ initialInterest = "single" }: OrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+375 ");
  const [interestType, setInterestType] = useState<"single" | "subscription" | "question">("single");
  const [grindType, setGrindType] = useState<string>("beans");
  const [comment, setComment] = useState("");
  const [utm, setUtm] = useState<UtmParams>({});

  const [items, setItems] = useState<CartItem[]>(
    AVAILABLE_ITEMS.map((item) => ({ ...item, count: 0 }))
  );

  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isDeduplicated, setIsDeduplicated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null);

  useEffect(() => {
    setUtm(getUtmParams());
  }, []);

  useEffect(() => {
    if (!initialInterest) return;

    const cleanInterest = initialInterest.split("#")[0];

    if (cleanInterest === "subscription") {
      setInterestType("subscription");
    } else if (cleanInterest.startsWith("single:")) {
      setInterestType("single");
      const productName = cleanInterest.replace("single: ", "").trim();

      setItems((prev) =>
        prev.map((item) => {
          if (item.name === productName) {
            return { ...item, count: item.count > 0 ? item.count : 1 };
          }
          return item;
        })
      );
    }
  }, [initialInterest]);

  const updateCount = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const totalCount = items.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.count * i.price, 0);

  useLayoutEffect(() => {
    if (phoneInputRef.current && cursorRef.current !== null) {
      phoneInputRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
    }
  }, [phone]);

  const formatPhone = (digits: string): string => {
    let clean = digits.startsWith("375") ? digits.slice(3) : digits;
    clean = clean.slice(0, 9);

    let res = "+375";
    if (clean.length > 0) res += " (" + clean.slice(0, 2);
    if (clean.length >= 2) res += ") " + clean.slice(2, 5);
    if (clean.length >= 5) res += "-" + clean.slice(5, 7);
    if (clean.length >= 7) res += "-" + clean.slice(7, 9);
    return res;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const newVal = input.value;
    const currentCursor = input.selectionStart || 0;

    const digitsBeforeCursor = newVal.slice(0, currentCursor).replace(/\D/g, "").length;
    const allDigits = newVal.replace(/\D/g, "");

    if (!allDigits.startsWith("375") && allDigits.length > 0) return;

    const formatted = formatPhone(allDigits);
    setPhone(formatted);

    let newCursorPos = 0;
    let countedDigits = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) countedDigits++;
      if (countedDigits >= digitsBeforeCursor) {
        newCursorPos = i + 1;
        break;
      }
    }
    if (newCursorPos < 5) newCursorPos = 5;

    cursorRef.current = newCursorPos;
    validatePhone(formatted);
  };

  const validatePhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 12) {
      setPhoneError("Номер неполный. Введите 9 цифр после +375.");
      return false;
    }
    const operator = digits.slice(3, 5);
    const validOperators = ["29", "33", "44", "25", "17"];

    if (!validOperators.includes(operator)) {
      setPhoneError("Неверный код оператора. Допустимы: 29, 33, 44, 25 или 17.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Пожалуйста, укажите имя");
      return;
    }

    if (!validatePhone(phone)) return;

    if (interestType === "single" && totalCount === 0) {
      alert("Пожалуйста, выберите хотя бы одну пачку кофе кнопкой «+»");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    let orderSummary = "";
    if (interestType === "single") {
      const selectedList = items
        .filter((i) => i.count > 0)
        .map((i) => `${i.name} (${i.count} шт.)`)
        .join(", ");
      const selectedGrind = GRIND_OPTIONS.find((g) => g.id === grindType)?.label || "В зёрнах";
      orderSummary = `Разовый заказ: ${selectedList}. Помол: ${selectedGrind}. Итого: ${totalPrice} BYN`;
    } else if (interestType === "subscription") {
      orderSummary = "Подписка на кофе: 2 пачки в месяц (54 BYN/мес)";
    } else {
      orderSummary = "Вопрос / Консультация по зерну";
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          interest: orderSummary,
          comment: comment.trim(),
          utm,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить заявку");
      }

      if (result.deduplicated) {
        setIsDeduplicated(true);
      } else {
        setIsDeduplicated(false);
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "Сервер временно недоступен. Свяжитесь с нами напрямую по телефону."
      );
    }
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#F4EFE6]/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200/90 shadow-lg">
          
          {status === "success" ? (
            <div className="text-center py-8">
              {isDeduplicated ? (
                <div>
                  <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                    Мы уже приняли вашу заявку!
                  </h3>
                  <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    Заявка с номера <span className="font-semibold text-stone-900">{phone}</span> уже поступила к нам пару минут назад.
                  </p>
                  <p className="mt-2 text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                    Если вы хотите изменить заказ или добавить ещё пачку — не переживайте, просто скажите об этом бариста, когда он позвонит для подтверждения.
                  </p>
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setIsDeduplicated(false);
                      }}
                      className="px-6 py-2.5 rounded-full bg-stone-900 text-stone-100 text-xs font-medium hover:bg-stone-800 transition-all"
                    >
                      Понятно, спасибо
                    </button>
                    <a
                      href="tel:+375291234567"
                      className="px-6 py-2.5 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-xs font-medium hover:bg-stone-200 transition-all inline-flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Позвонить в мастерскую</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-stone-900 font-normal">
                    Заявка принята!
                  </h3>
                  <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Спасибо, {name}! Мы перезвоним вам в течение часа в рабочее время (8:00–20:00), чтобы согласовать детали доставки.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setName("");
                      setPhone("+375 ");
                      setComment("");
                      setItems(AVAILABLE_ITEMS.map((item) => ({ ...item, count: 0 })));
                    }}
                    className="mt-8 px-6 py-2.5 rounded-full bg-stone-900 text-stone-100 text-xs font-medium hover:bg-stone-800 transition-all"
                  >
                    Оформить еще один заказ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-center max-w-lg mx-auto mb-8 sm:mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                  прямая связь с мастерской
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                  Оформить заказ или задать вопрос
                </h2>
                <p className="mt-3 text-stone-600 text-xs sm:text-sm">
                  Менеджер перезвонит для подтверждения. Никакой предоплаты — оплачиваете при получении.
                </p>
              </div>

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Не удалось отправить заявку</p>
                    <p className="mt-1 text-red-700">{errorMessage}</p>
                    <p className="mt-2 text-stone-700">
                      Позвоните нам: <a href="tel:+375291234567" className="underline font-semibold text-stone-900">+375 (29) 123-45-67</a>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
      
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Тип обращения:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "single", label: "Разовый заказ зерна" },
                      { id: "subscription", label: "Подписка (54 BYN/мес)" },
                      { id: "question", label: "Вопрос / Консультация" },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setInterestType(tab.id as any)}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                          interestType === tab.id
                            ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                            : "bg-[#FBF9F5] text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {interestType === "single" && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] border border-stone-200/80 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Выберите сорта и количество:
                      </span>
                      <span className="text-xs text-stone-500">
                        Выбрано пачек: <strong>{totalCount}</strong>
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-stone-200/60"
                        >
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-stone-900">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-stone-500">
                              {item.weight} · {item.price} BYN
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => updateCount(item.id, -1)}
                              disabled={item.count === 0}
                              className="w-7 h-7 rounded-lg bg-stone-100 disabled:opacity-30 hover:bg-stone-200 flex items-center justify-center text-stone-800 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs sm:text-sm font-semibold text-stone-900">
                              {item.count}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCount(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-stone-900 text-white hover:bg-stone-800 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Выбор помола: ровная эстетичная сетка */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                          Помол (бесплатно)
                        </label>
                        <span className="text-[11px] text-stone-400">
                          настроим под ваш девайс
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {GRIND_OPTIONS.map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setGrindType(opt.id)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                              grindType === opt.id
                                ? "bg-stone-900 text-stone-50 border-stone-900 shadow-sm"
                                : "bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-stone-500">Итого к оплате:</span>
                        <p className="font-serif text-2xl font-bold text-stone-900">
                          {totalPrice} BYN
                        </p>
                      </div>

                      <div className="text-xs">
                        {totalPrice >= 50 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            ✓ Бесплатная доставка по Минску
                          </span>
                        ) : totalPrice > 0 ? (
                          <span className="text-stone-500">
                            До бесплатной доставки: <strong>{50 - totalPrice} BYN</strong> (или самовывоз)
                          </span>
                        ) : (
                          <span className="text-amber-800 font-medium">
                            Добавьте хотя бы 1 пачку
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {interestType === "subscription" && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Тариф «Подписка на кофе» — 54 BYN в месяц</p>
                      <p className="mt-1 text-stone-600 text-xs">
                        Включает 2 свежие пачки по 250 г раз в месяц и бесплатную доставку курьером до двери каждую пятницу.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Ваше имя <span className="text-amber-800">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Алексей"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Телефон (Беларусь) <span className="text-amber-800">*</span>
                    </label>
                    <input
                      ref={phoneInputRef}
                      id="phone"
                      type="tel"
                      required
                      placeholder="+375 (29) 000-00-00"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                        phoneError
                          ? "border-red-400 focus:ring-red-400"
                          : "border-stone-200 focus:ring-stone-900 focus:bg-white"
                      }`}
                    />
                    {phoneError && (
                      <p className="mt-1.5 text-xs text-red-600">{phoneError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Комментарий или адрес доставки
                  </label>
                  <textarea
                    id="comment"
                    rows={2}
                    placeholder="Например: Минск, ул. Немига 5, кв 12. Доставка после 15:00..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Отправляем заявку...</span>
                    </>
                  ) : (
                    <>
                      <span>Отправить заявку</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-stone-400">
                  Менеджер перезвонит для согласования времени. Оплата при получении.
                </p>

              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}