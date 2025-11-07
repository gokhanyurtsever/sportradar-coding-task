import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEvent({ onAdd }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sport, setSport] = useState("");
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [venue, setVenue] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!date || !home || !away) return;
    onAdd({ date, time, sport, home, away, venue });
    navigate("/");
  };

  return (
    <div className="container py-4">
      <h2>Add Event</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Time (UTC)</label>
          <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Sport</label>
          <input type="text" className="form-control" value={sport} onChange={(e) => setSport(e.target.value)} placeholder="Football" />
        </div>
        <div className="mb-3">
          <label className="form-label">Home Team</label>
          <input type="text" className="form-control" value={home} onChange={(e) => setHome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Away Team</label>
          <input type="text" className="form-control" value={away} onChange={(e) => setAway(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input type="text" className="form-control" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Stadium" />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
