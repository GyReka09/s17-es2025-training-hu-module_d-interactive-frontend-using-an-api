import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MentorContext } from "../contexts/MentorContext";
import "../pages/css/mentors.css";

export default function Mentor({ mentor }) {
  const { bookedSession } = useContext(MentorContext);
  const navigate = useNavigate();

  function sessionBooked() {
    bookedSession(mentor.id).then(() => {
      navigate("/bookedsession");
    });
  }

  return (
    <div className="mentor-card keret">
      <h2 className="nagy">{mentor.mentorName}</h2>
      <p className="muted">{mentor.expertise}</p>
      <div className="mentor-meta">
        <span>{mentor.experienceLevel}</span>
        <span>{mentor.durationMinutes} min</span>
        <span>{mentor.creditCost} credits</span>
      </div>
      <div className="mentor-time">
        <div>
          {new Date(mentor.sessionDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div>
          {new Date(mentor.sessionDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
      <div className="button">
        <button
          className={`keret session ${
            mentor.isAvailable ? "available-button" : "inactive"
          }`}
          onClick={sessionBooked}
          disabled={!mentor.isAvailable}
        >
          {mentor.isAvailable ? "Available" : "Not available"}
        </button>
      </div>
    </div>
  );
}
