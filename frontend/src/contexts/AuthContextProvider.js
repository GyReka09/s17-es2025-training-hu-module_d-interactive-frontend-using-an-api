import { useState, useEffect, useCallback } from "react";
import { httpClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Felhasználó lekérése (refresh vagy login után)
  const getUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await httpClient.get("/api/v1/users/me");
      setUser(data);
    } catch (e) {
      setUser(null); // nincs session, nincs login
      if (e.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Login
  const login = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      setErrors({});
      try {
        const { data } = await httpClient.post("/api/v1/users/login", {
          email,
          password,
        });
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }
        await getUser(); // beállítja user state
        navigate("/dashboard"); // sikeres login után
      } catch (e) {
        if (e.response?.status === 422) {
          setErrors(e.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [getUser, navigate],
  );

  // Register
  const register = useCallback(
    async ({ name, email, password, cpassword }) => {
      setLoading(true);
      setErrors({});
      try {
        await httpClient.post("/api/v1/users/register", {
          name,
          email,
          password,
          cpassword,
        });
        navigate("/login"); // sikeres regisztráció után
      } catch (e) {
        if (e.response?.status === 422) {
          setErrors(e.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await httpClient.post("/api/v1/users/logout");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  }, [navigate]);

  // Megpróbáljuk betölteni a felhasználót refreshkor
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        loading,
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
