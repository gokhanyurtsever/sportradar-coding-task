import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";

function AddEvent() {
  return <div className="container py-4">Add Event will be here</div>;
}

export default function App() {
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
      <div className="calendar-wrapper container py-3">
        <h1 className="calendar-title">Sport Events Calendar</h1>
        <div className="month-navigation d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-outline-secondary" onClick={goToPreviousMonth}>&lt; Previous</button>
          <h5 className="month-label m-0">
            {new Date(currentMonth.year, currentMonth.month).toLocaleString("default", { month: "long", year: "numeric" })}
          </h5>
          <button className="btn btn-outline-secondary" onClick={goToNextMonth}>Next &gt;</button>
        </div>
        <Routes>
          <Route path="/" element={<Calendar year={currentMonth.year} month={currentMonth.month} />} />
          <Route path="/add" element={<AddEvent />} />
        </Routes>
      </div>
    </div>
  );
}
