"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export default function RoastTimer() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      
      const currentDay = now.getDay();
      let daysUntilThursday = (4 - currentDay + 7) % 7;

      if (daysUntilThursday === 0 && now.getHours() >= 10) {
        daysUntilThursday = 7;
      }

      const nextRoast = new Date(now);
      nextRoast.setDate(now.getDate() + daysUntilThursday);
      nextRoast.setHours(10, 0, 0, 0);

      const diff = nextRoast.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft({ days, hours, minutes });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-xs sm:text-sm font-medium mb-6">
        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
        <span>Жарим по четвергам · Развозим по пятницам</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium mb-6 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
      </span>
      <span>
        Обжарка в четверг: приём заказов ещё{" "}
        <strong className="font-semibold text-amber-900">
          {timeLeft.days > 0 ? `${timeLeft.days} д ` : ""}
          {timeLeft.hours} ч {timeLeft.minutes} мин
        </strong>
      </span>
    </div>
  );
}