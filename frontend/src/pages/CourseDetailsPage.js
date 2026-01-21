import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import "./css/courses.css";
import { CoursesContext } from "../contexts/CoursesContext";
import useAuthContext from "../hooks/UseAuthContext";

export default function CourseDetailsPage() {
  const { selectedCourse, getCourseById, loading, completeChapter } =
    useContext(CoursesContext);
  const { getUser } = useAuthContext();
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = state?.course?.id || id;

  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
    }
  }, [courseId, getCourseById]);

  useEffect(() => {
    if (window.LinkedInShare) {
      window.LinkedInShare.init({
        container: "#linkedin-share-root",
        theme: "light",
        locale: "en-US",
      });
    }
  }, []);

  if (loading || !selectedCourse || !selectedCourse.course) {
    return (
      <div className="page">
        <Navigation />
        <div className="loading">Az oldal betöltés alatt...</div>
      </div>
    );
  }

  const chapters = selectedCourse.course.chapters || [];
  const completedCount = chapters.filter((ch) => ch.isCompleted).length;
  const totalChapters = chapters.length || 1;
  const chapterPercent = Math.round((completedCount / totalChapters) * 100);

  const earnedCredits = chapters
    .filter((ch) => ch.isCompleted)
    .reduce((sum, ch) => sum + (ch.credits || 0), 0);
  const totalCredits = chapters.reduce((sum, ch) => sum + (ch.credits || 0), 0);
  const creditPercent = totalCredits
    ? Math.round((earnedCredits / totalCredits) * 100)
    : 0;

  function markAsCompleted(chapterId, isCompleted) {
    if (isCompleted) return;
    completeChapter(courseId, chapterId).then(() => {
      getUser();
      getCourseById(courseId);
    });
  }

  function share(chapter) {
    if (
      window.LinkedInShare &&
      typeof window.LinkedInShare.open === "function"
    ) {
      window.LinkedInShare.open({
        url: window.location.href,
        title: `Course: ${selectedCourse.course.title}`,
        summary: `I just completed "${chapter.title}"!`,
        source: "SkillShare Academy",
        tags: ["learning", "skills"],
      });
    } else {
      console.warn("LinkedInShare widget még nem elérhető");
    }
  }

  return (
    <div className="page">
      <Navigation />
      <div className="courseone padding">
        <div className="keret">
          <button className="keret padding" onClick={() => navigate(-1)}>
            Back to course
          </button>
          <h1>{selectedCourse.course.title}</h1>
          <p>{selectedCourse.course.description}</p>
          <p className="muted">{selectedCourse.course.difficulty}</p>

          <div className="progress">
            <div className="chapter-progress keret">
              <h3>Chapter progress</h3>
              <div className="progress-container">
                <div
                  className="progressbar"
                  style={{ width: `${chapterPercent}%` }}
                ></div>
              </div>
              <p>
                {completedCount} of {totalChapters} chapters completed (
                {chapterPercent} %)
              </p>
            </div>
            <div className="credit-progress keret">
              <h3>Credit progress</h3>
              <div className="progress-container">
                <div
                  className="progressbar"
                  style={{ width: `${creditPercent}%` }}
                ></div>
              </div>
              <p>
                {earnedCredits} of {totalCredits} credits earned (
                {creditPercent} %)
              </p>
            </div>
          </div>
        </div>

        {chapters.map((ch, i) => (
          <div className="keret" key={ch.id || i}>
            <h2 className="nagy alahuzas">
              Chapter {i + 1}: {ch.title}
            </h2>
            <p>{ch.description}</p>
            <div className="keret nagy szelesseg padding">
              {ch.credits} credits
            </div>
            <button className="inactive" style={{ background: "lightGray" }}>
              View chapter
            </button>
            <button
              className="keret"
              style={{
                background: ch.isCompleted ? "lightGreen" : "beige",
                cursor: ch.isCompleted ? "not-allowed" : "pointer",
              }}
              onClick={() => {
                markAsCompleted(ch.id, ch.isCompleted);
              }}
            >
              {ch.isCompleted ? "Chapter completed" : "Mark as Completed"}
            </button>
            <div>
              {ch.isCompleted ? (
                <button className="keret linkedin" onClick={() => share(ch)}>
                  Share achievement in LinkedIn
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}

        <div id="linkedin-share-root">LinkedIn widget</div>
      </div>
    </div>
  );
}
