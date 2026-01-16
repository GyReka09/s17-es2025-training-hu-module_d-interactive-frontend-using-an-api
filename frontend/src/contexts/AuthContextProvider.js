import { createContext, useState, useEffect } from "react";
import { httpClient } from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // CSRF cookie lekérése a Laravel Sanctumhoz
  const csrf = () => httpClient.get("/sanctum/csrf-cookie");

  // Felhasználó lekérése (refresh vagy login után)
  const getUser = async () => {
    try {
      const { data } = await httpClient.get("/api/v1/users/me");
      setUser(data);
    } catch (e) {
      setUser(null); // nincs session, nincs login
    }
  };

  // Login
  const login = async ({ email, password }) => {
    await csrf(); // CSRF cookie előtte
    setErrors({});
    try {
      await httpClient.post("/api/v1/users/login", { email, password });
      await getUser(); // beállítja user state
      navigate("/navigation"); // sikeres login után
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  // Register
  const register = async ({ name, email, password, cpassword }) => {
    await csrf(); // CSRF cookie előtte
    setErrors({});
    try {
      await httpClient.post("/api/v1/users/register", {
        name,
        email,
        password,
        cpassword,
      });
      await getUser(); // beállítja user state
      navigate("/navigation"); // sikeres regisztráció után
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  // Logout
  const logout = async () => {
    try {
      await httpClient.post("/api/v1/users/logout");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  // Megpróbáljuk betölteni a felhasználót refreshkor
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        getUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
