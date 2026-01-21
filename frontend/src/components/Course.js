import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoursesContext } from "../contexts/CoursesContext";
import "../pages/css/courses.css";

export default function Course({ course }) {
  const navigate = useNavigate();
  const { enrollCourse } = useContext(CoursesContext);

  function enroll() {
    if (!course.isEnrolled) {
      enrollCourse(course.id);
    }
    navigate(`/courses/${course.id}`, { state: { course } });
  }

  return (
    <div className="course-card keret">
      <p className="beiratkozva">{course.isEnrolled ? "✔" : "📝"}</p>
      <h2 className="nagy">{course.title}</h2>
      <p className="muted">{course.description}</p>
      <div className="course-meta">
        <span>{course.difficulty}</span>
        <span>{course.totalChapters} chapters</span>
        <span>{course.totalCredits} credits</span>
      </div>
      <button
        style={{ background: course.isEnrolled ? "lightGreen" : "beige" }}
        className="nagy"
        onClick={enroll}
      >
        {course.isEnrolled ? "continue learning" : "enroll"}
      </button>
    </div>
  );
}
