"use client";

import { useState } from "react";
import { Sparkles, X, ArrowRight, RotateCcw, Check } from "lucide-react";

interface CoffeeQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productName: string) => void;
}

export default function CoffeeQuiz({ isOpen, onClose, onSelectProduct }: CoffeeQuizProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [brewMethod, setBrewMethod] = useState<"milk" | "black">("black");
  const [flavorPreference, setFlavorPreference] = useState<"sweet_nutty" | "fruity_bright">("sweet_nutty");

  if (!isOpen) return null;

  // Логика рекомендации
  const getRecommendation = () => {
    if (brewMethod === "milk") {
      return {
        name: "Бразилия Серрадо",
        tag: "Идеально с молоком",
        desc: "Плотный шоколадно-ореховый профиль, который не теряется в капучино и латте.",
        price: "26 BYN",
      };
    }

    if (flavorPreference === "fruity_bright") {
      return {
        name: "Эфиопия Иргачеффе",
        tag: "Яркий чайный букет",
        desc: "Тонкие ноты бергамота, белых цветов и сочного персика. Чистый, легкий фильтр-кофе.",
        price: "32 BYN",
      };
    }

    return {
      name: "Колумбия Уила",
      tag: "Универсальный баланс",
      desc: "Сладкая карамель и спелое красное яблоко. Мягкая ненавязчивая кислотность.",
      price: "29 BYN",
    };
  };

  const recommendation = getRecommendation();

  const handleApply = () => {
    onSelectProduct(recommendation.name);
    onClose();
    const formEl = document.getElementById("order");
    formEl?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setStep(1);
    setBrewMethod("black");
    setFlavorPreference("sweet_nutty");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200">
        
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ШАГ 1: Молоко или Черный */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Вопрос 1 из 2</span>
            </div>

            <h3 className="font-serif text-2xl text-stone-900 font-normal">
              Как вы обычно пьете кофе?
            </h3>
            <p className="mt-2 text-xs text-stone-500">
              Это определит нужную плотность и обжарку зерна.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setBrewMethod("black");
                  setStep(2);
                }}
                className="w-full p-4 rounded-2xl border border-stone-200 text-left hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-900">Чёрным (без молока)</p>
                  <p className="text-xs text-stone-500 mt-0.5">Воронка, чашка, фильтр или чистый эспрессо</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setBrewMethod("milk");
                  setStep(3); // Если с молоком — сразу рекомендуем Бразилию
                }}
                className="w-full p-4 rounded-2xl border border-stone-200 text-left hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-900">С молоком / сливками</p>
                  <p className="text-xs text-stone-500 mt-0.5">Капучино, латте, флэт уайт или просто капля молока</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* ШАГ 2: Вкусовой профиль */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Вопрос 2 из 2</span>
            </div>

            <h3 className="font-serif text-2xl text-stone-900 font-normal">
              Какие вкусы вам ближе?
            </h3>
            <p className="mt-2 text-xs text-stone-500">
              Выберите букет, который хотите почувствовать в чашке.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setFlavorPreference("sweet_nutty");
                  setStep(3);
                }}
                className="w-full p-4 rounded-2xl border border-stone-200 text-left hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-900">Карамель, орехи и яблоко</p>
                  <p className="text-xs text-stone-500 mt-0.5">Мягкий классический баланс без резкой кислоты</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFlavorPreference("fruity_bright");
                  setStep(3);
                }}
                className="w-full p-4 rounded-2xl border border-stone-200 text-left hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-900">Цветы, бергамот и ягоды</p>
                  <p className="text-xs text-stone-500 mt-0.5">Светлая спешелти-обжарка, сочная ягодная кислотность</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* ШАГ 3: Рекомендация */}
        {step === 3 && (
          <div className="text-center py-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
              {recommendation.tag}
            </span>

            <h3 className="font-serif text-3xl text-stone-900 font-normal">
              {recommendation.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
              {recommendation.desc}
            </p>

            <div className="mt-4 font-serif text-2xl font-bold text-stone-900">
              {recommendation.price}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Выбрать этот кофе в заказ</span>
                <Check className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-full text-xs text-stone-500 hover:text-stone-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Пройти тест заново</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}