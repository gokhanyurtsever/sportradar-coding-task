import React, { useState } from "react";
import eventsJSON from "./data/events.json";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function buildTitle(ev) {
  const d = new Date(ev.dateVenue);
  const dayPart = d.toLocaleDateString("en-GB", { weekday: "short" });
  const datePart = d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timePart = ev.timeVenueUTC ? ev.timeVenueUTC.substring(0, 5) : "00:00";
  const sportPart = ev.sport ? ev.sport.charAt(0).toUpperCase() + ev.sport.slice(1) : "Sport";
  const home = ev.homeTeam?.name || "TBD";
  const away = ev.awayTeam?.name || "TBD";
  return `${dayPart}. ${datePart}, ${timePart}, ${sportPart}, ${home} vs. ${away}`;
}

function normalizeEvent(ev, idx) {
  return {
    ...ev,
    id: idx + 1,
    date: ev.date ?? ev.dateVenue,
    title: buildTitle(ev),
  };
}

export default function App() {
  const [events] = useState(() => eventsJSON.data.map(normalizeEvent));

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState({ year: now.getFullYear(), month: now.getMonth() });

  const goToPreviousMonth = () => {
    setCurrentMonth(({ year, month }) => (month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }));
  };

  const goToNextMonth = () => {
    setCurrentMonth(({ year, month }) => (month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }));
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="calendar-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="calendar-title">Sport Events Calendar</h1>
                <div className="month-navigation">
                  <button className="nav-btn" onClick={goToPreviousMonth}>&lt; Previous</button>
                  <h5 className="month-label">
                    {new Date(currentMonth.year, currentMonth.month).toLocaleString("default", { month: "long", year: "numeric" })}
                  </h5>
                  <button className="nav-btn" onClick={goToNextMonth}>Next &gt;</button>
                </div>
                <Calendar year={currentMonth.year} month={currentMonth.month} events={events} />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
