import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import useAuthContext from "../hooks/UseAuthContext";
import { usePolling } from "../hooks/usePolling";
import BookedSession from "../components/BookedSession";
import "./css/bookedSession.css";

export default function BookedSessionPage() {
  const navigate = useNavigate();
  const { getUser, user, loading } = useAuthContext();

  useEffect(() => {
    getUser();
  }, [getUser]);

  usePolling(() => {
    getUser();
  }, 30000);

  const sessions = user?.sessions || [];

  if (loading || sessions.length === 0) {
    return (
      <div className="page">
        <Navigation />
        <div className="loading">
          Betöltés folyamatban, vagy nincs felvett mentor...
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />
      <div className="booked-page">
        <button className="keret padding" onClick={() => navigate(-1)}>
          Back to Mentors
        </button>
        <div className="booked-grid">
          {sessions.map((session, i) => (
            <BookedSession session={session} key={session.id || i} />
          ))}
        </div>
      </div>
    </div>
  );
}
