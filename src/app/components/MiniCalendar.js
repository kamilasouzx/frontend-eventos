"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function MiniCalendar({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthName = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const weeks = [];
  let dayCounter = 1 - firstDay;

  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push(dayCounter > 0 && dayCounter <= daysInMonth ? dayCounter : "");
      dayCounter++;
    }
    weeks.push(week);
  }

  function changeMonth(dir) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setCurrentDate(newDate);
  }

  function selectDay(day) {
    if (!day) return;
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onSelect?.(selected);
    setOpen(false);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-xl shadow-md hover:bg-cyan-600 transition"
      >
        <Calendar size={18} /> Selecionar Dia
      </button>

      {open && (
        <div className="absolute top-14 left-0 bg-white text-black rounded-xl shadow-2xl border border-gray-200 p-4 w-72 z-50">

          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => changeMonth(-1)}
              className="p-1 hover:bg-gray-200 rounded-lg"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="font-semibold capitalize">{monthName}</span>

            <button
              onClick={() => changeMonth(1)}
              className="p-1 hover:bg-gray-200 rounded-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 mb-2">
            <span>D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="grid grid-cols-7 text-center gap-2">
            {weeks.flat().map((day, i) => (
              <div key={i}>
                {day ? (
                  <button
                    onClick={() => selectDay(day)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-600 hover:text-white transition"
                  >
                    {day}
                  </button>
                ) : (
                  <span className="w-8 h-8 inline-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
