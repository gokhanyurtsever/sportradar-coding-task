import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const now = new Date();
  const homePath = `/month/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={homePath}>Sport Calendar</Link>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" to="/add">Add Event</Link>
        </div>
      </div>
    </nav>
  );
}
