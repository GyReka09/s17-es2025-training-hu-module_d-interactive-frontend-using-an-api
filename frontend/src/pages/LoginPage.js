import React, { useState } from "react";
import "./css/login.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    console.log("LOGIN:", { email, password });
  }

  return (
    <div className="page">
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

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => setPassword(e.target.value)}
          />

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
