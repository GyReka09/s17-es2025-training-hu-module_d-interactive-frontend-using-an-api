import React, { useState } from "react";
import "./css/login.css";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/UseAuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useAuthContext();

  function submit(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <div className="auth-page">
      <div className="login">
        <h1>Üdv újra!</h1>
        <form onSubmit={submit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email címed"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div>
              <span>{errors.email[0]}</span>
            </div>
          )}

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div>
              <span>{errors.password[0]}</span>
            </div>
          )}

          <button type="submit">Bejelentkezés</button>
        </form>
        <p className="bottom-text">
          Ingyenes a regisztráció!{" "}
          <Link to="/register">Új fiók létrehozása</Link>
        </p>
      </div>
    </div>
  );
}
