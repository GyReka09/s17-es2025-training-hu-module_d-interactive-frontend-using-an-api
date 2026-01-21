import React, { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import { MentorContext } from "../contexts/MentorContext";
import useAuthContext from "../hooks/UseAuthContext";
import Mentor from "../components/Mentor";
import "./css/mentors.css";

export default function MentorsPage() {
  const { mentorList, loading, getMentors } = useContext(MentorContext);
  const { getUser, user } = useAuthContext();

  useEffect(() => {
    getMentors();
    getUser();
  }, [getMentors, getUser]);

  return (
    <div className="page">
      <Navigation />
      <div className="mentors-page">
        <div className="mentors-header keret">
          <div>
            <h1>Mentor Sessions</h1>
            <p>Book a session with an expert mentor.</p>
          </div>
          <div className="credit-pill">
            Credits: {user?.user?.creditBalance ?? "-"}
          </div>
        </div>
        {loading ? (
          <div className="loading">Betöltés folyamatban...</div>
        ) : (
          <div className="mentors-grid">
            {mentorList.map((mentor) => (
              <Mentor mentor={mentor} key={mentor.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
