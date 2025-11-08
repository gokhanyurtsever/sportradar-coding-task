import React, { useState, useEffect } from "react";
import eventsJSON from "./data/events.json";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
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

function MonthView({ events }) {
  const params = useParams();
  const navigate = useNavigate();
  const y = Number(params.year);
  const m = Number(params.month) - 1;
  const valid = Number.isInteger(y) && Number.isInteger(m) && m >= 0 && m <= 11;
  const now = new Date();
  const year = valid ? y : now.getFullYear();
  const month = valid ? m : now.getMonth();

  const goPrev = () => {
    const prev = month === 0 ? { y: year - 1, m: 12 } : { y: year, m: month };
    const mm = month === 0 ? 12 : month;
    navigate(`/month/${prev.y}/${String(mm).padStart(2, "0")}`);
  };

  const goNext = () => {
    const next = month === 11 ? { y: year + 1, m: 1 } : { y: year, m: month + 2 };
    navigate(`/month/${next.y}/${String(next.m).padStart(2, "0")}`);
  };

  return (
    <div className="calendar-wrapper container-fluid py-3">
      <h1 className="calendar-title">Sport Events Calendar</h1>
      <div className="month-navigation d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={goPrev}>&lt; Previous</button>
        <h5 className="month-label m-0">
          {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
        </h5>
        <button className="btn btn-primary" onClick={goNext}>Next &gt;</button>
      </div>
      <Calendar year={year} month={month} events={events} />
    </div>
  );
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

  const now = new Date();
  const currentPath = `/month/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={currentPath} replace />} />
        <Route path="/month/:year/:month" element={<MonthView events={events} />} />
        <Route path="/add" element={<AddEvent onAdd={addEvent} />} />
        <Route path="/event/:id" element={<EventDetail events={events} />} />
      </Routes>
    </div>
  );
}
