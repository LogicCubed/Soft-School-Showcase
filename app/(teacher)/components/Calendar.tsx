"use client";

import { Button } from "components/ui/button";
import { useState } from "react";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // First day of month (Mon=0)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      {/* Month / Year */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="default" className="cursor-pointer" onClick={prevMonth}>
          &lt;
        </Button>
        <h2 className="text-lg font-bold text-slate-800">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h2>
        <Button variant="default" className="cursor-pointer" onClick={nextMonth}>
          &gt;
        </Button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center font-semibold text-slate-400 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Empty slots */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNumber = i + 1;
          const isToday =
            dayNumber === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <button
              key={dayNumber}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer text-sm font-medium ${
                isToday
                  ? "bg-sky-400 text-white font-semibold rounded-full"
                  : "text-slate-400 font-semibold outline-none"
              }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}