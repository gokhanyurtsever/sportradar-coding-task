import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EventDetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id.toString() === id);
  if (!event) {
    return (
      <div className="container mt-4">
        <h2>Event not found</h2>
        <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const {
    dateVenue,
    timeVenueUTC,
    sport,
    homeTeam,
    awayTeam,
    status,
    result,
    stage,
    originCompetitionName,
    season,
    stadium,
  } = event;

  const home = homeTeam || {};
  const away = awayTeam || {};
  const resultDetails = result || {};
  const stageDetails = stage || {};

  const getScoreDisplay = () => {
    if (
      resultDetails &&
      typeof resultDetails.homeGoals === "number" &&
      typeof resultDetails.awayGoals === "number"
    ) {
      return `${resultDetails.homeGoals} - ${resultDetails.awayGoals}`;
    }
    return "Not played yet";
  };

  const getStatusBadge = () => {
    switch (String(status || "").toLowerCase()) {
      case "played":
        return "bg-success";
      case "scheduled":
        return "bg-primary";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        ← Back to Calendar
      </button>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">🏆 {originCompetitionName || "Competition"}</h2>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <p><strong>Season:</strong> {season || "N/A"}</p>
              {stageDetails.name && <p><strong>Stage:</strong> {stageDetails.name}</p>}
            </div>
            <div className="col-md-6">
              <p><strong>Date:</strong> {formatDate(dateVenue)}</p>
              {timeVenueUTC && <p><strong>Time:</strong> {timeVenueUTC.substring(0,5)} UTC</p>}
              {stadium && <p><strong>Stadium:</strong> {stadium}</p>}
              <p>
                <strong>Status:</strong>{" "}
                <span className={`badge ${getStatusBadge()}`}>
                  {status || "scheduled"}
                </span>
              </p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light"><h5 className="mb-0">Home Team</h5></div>
                <div className="card-body">
                  <h4 className="text-primary">{home.name || "TBD"}</h4>
                  <p><strong>Official Name:</strong> {home.officialName || home.name || "N/A"}</p>
                  <p><strong>Abbreviation:</strong> {home.abbreviation || "N/A"}</p>
                  <p><strong>Country Code:</strong> {home.teamCountryCode || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light"><h5 className="mb-0">Away Team</h5></div>
                <div className="card-body">
                  <h4 className="text-danger">{away.name || "TBD"}</h4>
                  <p><strong>Official Name:</strong> {away.officialName || away.name || "N/A"}</p>
                  <p><strong>Abbreviation:</strong> {away.abbreviation || "N/A"}</p>
                  <p><strong>Country Code:</strong> {away.teamCountryCode || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header bg-light"><h5 className="mb-0">Match Result</h5></div>
            <div className="card-body text-center">
              <div className="fs-1 fw-bold mb-3">{getScoreDisplay()}</div>
              {resultDetails && resultDetails.winner && (
                <p><strong>Winner:</strong> {resultDetails.winner}</p>
              )}
              {resultDetails && resultDetails.message && (
                <p className="text-muted">{resultDetails.message}</p>
              )}
            </div>
          </div>

          {resultDetails && typeof resultDetails.homeGoals === "number" && (
            <div>
              <h5>Match Statistics</h5>
              <div className="row">
                {Array.isArray(resultDetails.goals) && resultDetails.goals.length > 0 && (
                  <div className="col-md-6">
                    <strong>Goals:</strong>
                    <ul className="list-unstyled">
                      {resultDetails.goals.map((goal, idx) => (
                        <li key={idx}>⚽ {goal.playerName || "Unknown"} ({goal.team || "Unknown"}) {goal.minute ? `- ${goal.minute}'` : ""}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(resultDetails.yellowCards) && resultDetails.yellowCards.length > 0 && (
                  <div className="col-md-6">
                    <strong>Yellow Cards:</strong>
                    <ul className="list-unstyled">
                      {resultDetails.yellowCards.map((card, idx) => (
                        <li key={idx}>🟨 {card.playerName || "Unknown"} ({card.team || "Unknown"}) {card.minute ? `- ${card.minute}'` : ""}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
