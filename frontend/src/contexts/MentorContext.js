import { createContext, useCallback, useState } from "react";
import { httpClient } from "../api/axios";

export const MentorContext = createContext();

export function MentorProvider({ children }) {
  const [mentorList, setMentorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const getMentors = useCallback(() => {
    setLoading(true);
    httpClient
      .get("/api/v1/mentors/sessions")
      .then((response) => {
        setMentorList(response.data.sessions || []);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const bookedSession = useCallback((id) => {
    if (!id) return Promise.resolve();
    setLoading(true);
    return httpClient
      .post(`/api/v1/mentors/sessions/${id}/book`)
      .finally(() => setLoading(false));
  }, []);

  return (
    <MentorContext.Provider
      value={{ mentorList, loading, getMentors, bookedSession, serverError }}
    >
      {children}
    </MentorContext.Provider>
  );
}
