import React, { useState, useEffect } from "react";
import eventsJSON from "./data/events.json";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import "./App.css";

function resolveTeamName(ev, side) {
  const s = String(side).toLowerCase();
  const a = ev?.[s + "Team"]?.name;
  const b = ev?.[s]?.name;
  const d = ev?.[s + "TeamName"];
  const pools = [
    Array.isArray(ev?.competitors) ? ev.competitors : null,
    Array.isArray(ev?.teams) ? ev.teams : null,
    Array.isArray(ev?.participants) ? ev.participants : null
  ].filter(Boolean);
  let c = "";
  for (const arr of pools) {
    const hit =
      arr.find(t => String(t?.qualifier).toLowerCase() === s) ||
      arr.find(t => String(t?.homeAway).toLowerCase() === s) ||
      arr.find(t => String(t?.side).toLowerCase() === s) ||
      arr.find(t => String(t?.teamType).toLowerCase() === s) ||
      arr.find(t => t?.isHome === true && s === "home") ||
      arr.find(t => t?.isAway === true && s === "away");
    if (hit?.name) { c = hit.name; break; }
    if (hit?.team?.name) { c = hit.team.name; break; }
  }
  return a || b || c || d || "";
}

function buildTitle(ev) {
  const date = ev.dateVenue || ev.date;
  const d = new Date(date);
  const dayPart = d.toLocaleDateString("en-GB", { weekday: "short" });
  const datePart = d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timePart = ev.timeVenueUTC ? ev.timeVenueUTC.substring(0, 5) : "00:00";
  const sportPart = ev.sport ? ev.sport.charAt(0).toUpperCase() + ev.sport.slice(1) : "Sport";
  const home = resolveTeamName(ev, "home") || "TBD";
  const away = resolveTeamName(ev, "away") || "TBD";
  return `${dayPart}. ${datePart}, ${timePart}, ${sportPart}, ${home} vs. ${away}`;
}

function normalizeEvent(ev, idx) {
  const date = ev.date ?? ev.dateVenue;
  return {
    ...ev,
    id: idx + 1,
    date,
    title: buildTitle({ ...ev, dateVenue: date })
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
    const prevY = month === 0 ? year - 1 : year;
    const prevM = month === 0 ? 12 : month;
    navigate(`/month/${prevY}/${String(prevM).padStart(2, "0")}`);
  };

  const goNext = () => {
    const nextY = month === 11 ? year + 1 : year;
    const nextM = month === 11 ? 1 : month + 2;
    navigate(`/month/${nextY}/${String(nextM).padStart(2, "0")}`);
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
