import React, { useState, useEffect } from "react";
import eventsJSON from "./data/events.json";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
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

function AddEventPlaceholder() {
  return null;
}

export default function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    if (saved) return JSON.parse(saved);
    return eventsJSON.data.map(normalizeEvent);
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState({ year: now.getFullYear(), month: now.getMonth() });

  const goToPreviousMonth = () => {
    setCurrentMonth(({ year, month }) => (month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }));
  };

  const goToNextMonth = () => {
    setCurrentMonth(({ year, month }) => (month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }));
  };

  const addEvent = (data) => {
    const maxId = events.reduce((m, e) => Math.max(m, Number(e.id) || 0), 0);
    const payload = {
      id: maxId + 1,
      date: data.date,
      dateVenue: data.date,
      timeVenueUTC: data.time || "",
      sport: data.sport || "",
      homeTeam: { name: data.home || "TBD" },
      awayTeam: { name: data.away || "TBD" },
      venue: data.venue ? { name: data.venue } : undefined,
    };
    const titled = { ...payload, title: buildTitle(payload) };
    setEvents((prev) => [...prev, titled]);
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="calendar-wrapper container-fluid py-3">
        <h1 className="calendar-title">Sport Events Calendar</h1>
        <div className="month-navigation d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-primary" onClick={goToPreviousMonth}>&lt; Previous</button>
          <h5 className="month-label m-0">
            {new Date(currentMonth.year, currentMonth.month).toLocaleString("default", { month: "long", year: "numeric" })}
          </h5>
          <button className="btn btn-primary" onClick={goToNextMonth}>Next &gt;</button>
        </div>
        <Routes>
          <Route path="/" element={<Calendar year={currentMonth.year} month={currentMonth.month} events={events} />} />
          <Route path="/add" element={<AddEvent onAdd={addEvent} />} />
          <Route path="/event/:id" element={<EventDetail events={events} />} />
          <Route path="/__placeholder" element={<AddEventPlaceholder />} />
        </Routes>
      </div>
    </div>
  );
}
