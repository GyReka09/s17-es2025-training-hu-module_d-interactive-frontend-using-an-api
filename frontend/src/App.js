import { Route, Routes } from "react-router-dom";
import "./App.css";
import Registration from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import Navigation from "./pages/Navigation";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import MentorsPage from "./pages/MentorsPage";
import BookedSessionPage from "./pages/BookedSessionPage";
import { CoursesProvider } from "./contexts/CoursesContext";
import { MentorProvider } from "./contexts/MentorContext";

function App() {
  return (
    <>
      <CoursesProvider>
        <MentorProvider>
          <div>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/navigation" element={<Navigation />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/mentors" element={<MentorsPage />} />
              <Route path="/bookedsession" element={<BookedSessionPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </div>
        </MentorProvider>
      </CoursesProvider>
    </>
  );
}

export default App;
