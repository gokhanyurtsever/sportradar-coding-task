import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Sport Calendar</Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-primary me-2" to="/">Calendar</Link>
        <Link className="btn btn-primary" to="/add">Add Event</Link>
      </div>
    </nav>
  );
}
