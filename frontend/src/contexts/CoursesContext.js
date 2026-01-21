import { createContext, useCallback, useState } from "react";
import { httpClient } from "../api/axios";

export const CoursesContext = createContext();

export function CoursesProvider({ children }) {
  const [coursesList, setCoursesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const getCourses = useCallback(() => {
    setLoading(true);
    httpClient
      .get("/api/v1/courses")
      .then((response) => {
        setCoursesList(response.data.courses || []);
        setFilteredList(response.data.courses || []);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const getCourseById = useCallback((id) => {
    if (!id) return;
    setLoading(true);
    httpClient
      .get(`/api/v1/courses/${id}`)
      .then((response) => {
        setSelectedCourse(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const szuro = useCallback(
    (difficulty, search) => {
      const filtered = coursesList.filter((course) => {
        const difficultyOk =
          difficulty === "all" || course.difficulty === difficulty;
        const searchOk =
          search === "" ||
          course.description.toLowerCase().includes(search.toLowerCase()) ||
          course.title.toLowerCase().includes(search.toLowerCase());
        return difficultyOk && searchOk;
      });

      setFilteredList(filtered);
    },
    [coursesList],
  );

  const enrollCourse = useCallback((courseId) => {
    if (!courseId) return;
    setLoading(true);
    httpClient
      .post(`/api/v1/courses/${courseId}/enroll`, { isEnrolled: true })
      .then(() => {
        setCoursesList((prev) =>
          prev.map((course) =>
            course.id === courseId ? { ...course, isEnrolled: true } : course,
          ),
        );
        setFilteredList((prev) =>
          prev.map((course) =>
            course.id === courseId ? { ...course, isEnrolled: true } : course,
          ),
        );
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const completeChapter = useCallback((courseId, chapterId) => {
    if (!courseId || !chapterId) return Promise.resolve();
    setLoading(true);
    return httpClient
      .post(`/api/v1/courses/${courseId}/chapters/${chapterId}/complete`)
      .finally(() => setLoading(false));
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        getCourses,
        filteredList,
        loading,
        szuro,
        enrollCourse,
        selectedCourse,
        getCourseById,
        completeChapter,
        serverError,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
