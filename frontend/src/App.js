import { Route, Routes } from "react-router-dom";
import "./App.css";
import Registration from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <>
      <div>
        <Routes>
            <Route path="/" element={<Navigation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
