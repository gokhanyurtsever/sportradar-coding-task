import React from "react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({ year, month }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-start-${i}`} className="calendar-cell empty" aria-hidden />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(
      <div key={`day-${day}`} className="calendar-cell">
        <div className="day-number">{day}</div>
      </div>
    );
  }
  const remainder = cells.length % 7;
  if (remainder !== 0) {
    const toAdd = 7 - remainder;
    for (let i = 0; i < toAdd; i++) {
      cells.push(<div key={`empty-end-${i}`} className="calendar-cell empty" aria-hidden />);
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header" role="row">
        {daysOfWeek.map((d) => (
          <div key={d} className="calendar-header-cell">{d}</div>
        ))}
      </div>
      <div className="calendar-grid" role="grid" aria-label="Month calendar">
        {cells}
      </div>
    </div>
  );
}
