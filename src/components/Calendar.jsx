import React from "react";
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({ year, month, events = [] }) {
  const navigate = useNavigate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const cells = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-start-${i}`} className="calendar-cell empty" aria-hidden />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const eventsOnDay = events.filter((e) => e.date === dateStr);

    cells.push(
      <div
        key={`day-${day}`}
        className="calendar-cell"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && eventsOnDay.length > 0) {
            e.preventDefault();
            navigate(`/event/${eventsOnDay[0].id}`);
          }
        }}
      >
        <div className="day-number" aria-label={`Day ${day}`}>{day}</div>
        <div className="event-list" aria-live="polite">
          {eventsOnDay.length === 0 ? (
            <div style={{ height: 0 }} />
          ) : (
            eventsOnDay.map((ev) => (
              <div
                key={ev.id}
                className="event-title"
                title={ev.title}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/event/${ev.id}`);
                }}
              >
                {ev.title}
              </div>
            ))
          )}
        </div>
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
