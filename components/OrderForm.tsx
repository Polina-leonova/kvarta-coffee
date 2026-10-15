"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getUtmParams, UtmParams } from "../lib/utm";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

interface OrderFormProps {
  initialInterest?: string;
}

export default function OrderForm({ initialInterest = "single" }: OrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+375 ");
  const [interest, setInterest] = useState(initialInterest);
  const [comment, setComment] = useState("");
  const [utm, setUtm] = useState<UtmParams>({});

  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null);

  // Подхватываем UTM метки
  useEffect(() => {
    setUtm(getUtmParams());
  }, []);

  useEffect(() => {
    if (initialInterest) {
      setInterest(initialInterest);
    }
  }, [initialInterest]);

  // Восстанавливаем позицию курсора сразу после обновления DOM
  useLayoutEffect(() => {
    if (phoneInputRef.current && cursorRef.current !== null) {
      phoneInputRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
    }
  }, [phone]);

  // Форматирование по маске +375 (XX) XXX-XX-XX
  const formatPhone = (rawDigits: string): string => {
    let clean = rawDigits;
    if (clean.startsWith("375")) {
      clean = clean.slice(3);
    }
    clean = clean.slice(0, 9); // максимум 9 цифр после кода

    let res = "+375";
    if (clean.length > 0) {
      res += " (" + clean.slice(0, 2);
    }
    if (clean.length >= 2) {
      res += ") " + clean.slice(2, 5);
    }
    if (clean.length >= 5) {
      res += "-" + clean.slice(5, 7);
    }
    if (clean.length >= 7) {
      res += "-" + clean.slice(7, 9);
    }
    return res;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const oldVal = phone;
    const newVal = input.value;
    const currentCursor = input.selectionStart || 0;

    // Считаем, сколько цифр было ДО курсора
    const digitsBeforeCursor = newVal.slice(0, currentCursor).replace(/\D/g, "").length;

    // Вытаскиваем все цифры
    const allDigits = newVal.replace(/\D/g, "");

    // Если попытались стереть код страны +375
    if (!allDigits.startsWith("375") && allDigits.length > 0) {
      return;
    }

    const formatted = formatPhone(allDigits);
    setPhone(formatted);

    // Вычисляем новую позицию курсора на основе количества цифр
    let newCursorPos = 0;
    let countedDigits = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) {
        countedDigits++;
      }
      if (countedDigits >= digitsBeforeCursor) {
        newCursorPos = i + 1;
        break;
      }
    }

    // Если курсор пытается залезть внутрь "+375 "
    if (newCursorPos < 5) {
      newCursorPos = 5;
    }

    cursorRef.current = newCursorPos;
    validatePhone(formatted);
  };

  // Валидация белорусского номера
  const validatePhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");

    if (digits.length < 12) {
      setPhoneError("Номер неполный. Введите 9 цифр (например, +375 (29) 123-45-67)");
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

    if (!validatePhone(phone)) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          interest,
          comment: comment.trim(),
          utm,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить заявку");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "Сервер временно недоступен. Свяжитесь с нами напрямую по телефону или в Telegram."
      );
    }
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#F4EFE6]/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-lg">
          
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-stone-900 font-normal">
                Заявка принята!
              </h3>
              <p className="mt-3 text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Спасибо, {name}! Мы перезвоним вам в течение часа в рабочее время (8:00–20:00), чтобы подтвердить заказ и адрес доставки.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setPhone("+375 ");
                  setComment("");
                }}
                className="mt-8 px-6 py-2.5 rounded-full bg-stone-900 text-stone-100 text-xs font-medium hover:bg-stone-800 transition-all"
              >
                Отправить еще одну заявку
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center max-w-lg mx-auto mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                  прямая связь с мастерской
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                  Оформить заказ или задать вопрос
                </h2>
                <p className="mt-3 text-stone-600 text-xs sm:text-sm">
                  Менеджер перезвонит для подтверждения. Никакой оплаты на сайте — платите при получении курьеру или на Короля, 9.
                </p>
              </div>

              {status === "error" && (
                <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Не удалось отправить заявку</p>
                    <p className="mt-1 text-red-700">{errorMessage}</p>
                    <p className="mt-2 text-stone-700">
                      Позвоните нам:{" "}
                      <a href="tel:+375291234567" className="underline font-semibold text-stone-900">
                        +375 (29) 123-45-67
                      </a>{" "}
                      или напишите в Telegram.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Что интересует */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Что вас интересует?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "subscription", label: "Подписка (54 BYN/мес)" },
                      { id: "single", label: "Разовый заказ зерна" },
                      { id: "question", label: "Вопрос / Консультация" },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center justify-center p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all text-center ${
                          interest.includes(item.id) || interest === item.id
                            ? "bg-stone-900 text-stone-100 border-stone-900 shadow-sm"
                            : "bg-[#FBF9F5] text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={item.id}
                          checked={interest.includes(item.id) || interest === item.id}
                          onChange={(e) => setInterest(e.target.value)}
                          className="sr-only"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Имя и Телефон */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                {/* 3. Комментарий */}
                <div>
                  <label htmlFor="comment" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Комментарий или пожелания
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    placeholder="Например: помолоть под гейзер, доставка в пятницу после 14:00..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF9F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
                  />
                </div>

                {/* Кнопка отправки */}
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
                  Менеджер свяжется для подтверждения. Никакого спама.
                </p>

              </form>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}