import React, { useContext, useEffect } from "react";
import Navigation from "./Navigation";
import { CoursesContext } from "../contexts/CoursesContext";
import CourseSearch from "../components/CourseSearch";
import Course from "../components/Course";
import "./css/courses.css";

export default function CoursesPage() {
  const { getCourses, filteredList, loading } = useContext(CoursesContext);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div className="page">
      <Navigation />
      <div className="courses-page">
        <CourseSearch />
        {loading ? (
          <div className="loading">Betöltés folyamatban...</div>
        ) : (
          <div className="courses">
            {filteredList.map((course) => (
              <Course course={course} key={course.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
