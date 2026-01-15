import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navigation from "./pages/Navigation";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/navigation",
      element: <Navigation />,
    },
  ]);

  return <RouterProvider router={router} />;
}
