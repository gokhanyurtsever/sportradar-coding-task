import React from "react";
import { useParams } from "react-router-dom";

export default function EventDetail({ events = [] }) {
  const { id } = useParams();
  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return <div className="container py-4">Event not found.</div>;
  }

  return (
    <div className="container py-4">
      <h2>{event.title}</h2>
      <ul className="list-unstyled">
        <li><strong>ID:</strong> {event.id}</li>
        <li><strong>Date:</strong> {event.date}</li>
        <li><strong>Sport:</strong> {event.sport || "N/A"}</li>
        <li><strong>Home:</strong> {event.homeTeam?.name || "TBD"}</li>
        <li><strong>Away:</strong> {event.awayTeam?.name || "TBD"}</li>
        <li><strong>Stadium:</strong> {event.venue?.name || "N/A"}</li>
      </ul>
    </div>
  );
}
