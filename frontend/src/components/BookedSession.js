import React from "react";
import "../pages/css/bookedSession.css";

export default function BookedSession({ session }) {
  const sessionDate = session.sessionDate || session.date;
  return (
    <div className="booked-card keret">
      <h2 className="nagy">{session.mentorName || "Mentor"}</h2>
      <p className="muted">{session.expertise}</p>
      <div className="booked-meta">
        <span>{session.creditCost} credits</span>
        <span>{session.durationMinutes} min</span>
        <span className={`status ${session.status || "pending"}`}>
          {session.status || "pending"}
        </span>
      </div>
      {sessionDate && (
        <div className="booked-time">
          <div>
            {new Date(sessionDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div>
            {new Date(sessionDate).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      )}
    </div>
  );
}
