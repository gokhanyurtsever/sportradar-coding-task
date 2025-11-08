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
    originCompetitionName,
    season
  } = event;

  const home = homeTeam || {};
  const away = awayTeam || {};

  const homeName = (home.name || "").trim();
  const awayName = (away.name || "").trim();

  const hasHome = Boolean(homeName);
  const hasAway = Boolean(awayName);

  const hasScore =
    result &&
    typeof result.homeGoals === "number" &&
    typeof result.awayGoals === "number";

  const scoreline = hasScore ? `${result.homeGoals} - ${result.awayGoals}` : "vs";

  const dateLabel = (() => {
    if (!dateVenue) return "";
    try {
      return new Date(dateVenue).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return dateVenue;
    }
  })();

  const timeLabel = timeVenueUTC ? timeVenueUTC.substring(0, 5) : "";
  const sportLabel = sport ? sport.charAt(0).toUpperCase() + sport.slice(1) : "";
  const statusText = status || "scheduled";

  const homeInitials = hasHome ? homeName.split(" ").map(s => s[0]).join("").slice(0,3).toUpperCase() : "";
  const awayInitials = hasAway ? awayName.split(" ").map(s => s[0]).join("").slice(0,3).toUpperCase() : "";

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        ← Back to Calendar
      </button>

      <div className="card detail-card mx-auto">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{originCompetitionName || "Competition"}</h2>
        </div>

        <div className="card-body">
          <div className="detail-header">
            <div className="team-block text-start">
              <div className="team-avatar bg-primary text-white">{homeInitials}</div>
              {hasHome ? <div className="team-name">{homeName}</div> : null}
            </div>

            <div className="score-meta text-center">
              {sportLabel && <span className="badge text-bg-secondary rounded-pill">{sportLabel}</span>}
              {season && <span className="badge text-bg-secondary rounded-pill ms-2">{season}</span>}
              <div className="scoreline">{scoreline}</div>
              <div className="datetime text-muted">
                {dateLabel}{timeLabel ? ` • ${timeLabel} UTC` : ""}
              </div>
              <div className="status-text text-muted">{statusText}</div>
            </div>

            <div className="team-block text-end">
              {hasAway ? <div className="team-name">{awayName}</div> : null}
              <div className="team-avatar bg-danger text-white">{awayInitials}</div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light"><h5 className="mb-0">Home Team</h5></div>
                <div className="card-body">
                  <h4 className="text-primary">{hasHome ? homeName : ""}</h4>
                  <p><strong>Official Name:</strong> <span>{home.officialName || (hasHome ? homeName : "")}</span></p>
                  <p><strong>Abbreviation:</strong> <span>{home.abbreviation || ""}</span></p>
                  <p><strong>Country Code:</strong> <span>{home.teamCountryCode || ""}</span></p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light"><h5 className="mb-0">Away Team</h5></div>
                <div className="card-body">
                  <h4 className="text-danger">{hasAway ? awayName : ""}</h4>
                  <p><strong>Official Name:</strong> <span>{away.officialName || (hasAway ? awayName : "")}</span></p>
                  <p><strong>Abbreviation:</strong> <span>{away.abbreviation || ""}</span></p>
                  <p><strong>Country Code:</strong> <span>{away.teamCountryCode || ""}</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
