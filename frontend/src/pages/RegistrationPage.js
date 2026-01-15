import React, { useState } from "react";
import "./css/login.css";
import "./css/registration.css";
import { NavLink } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    console.log("LOGIN:", { email, password });
  }

  return (
    <div className="page">
      <div className="registration">
        <h1>Új fiók létrehozása</h1>
        <form onSubmit={submit}>
          <label>Teljes név</label>
          <input
            type="fullname"
            value={fullname}
            placeholder="Add meg a teljes neved"
            onChange={(e) => setFullname(e.target.value)}
          />

          <label>Email Cím</label>
          <input
            type="email"
            value={email}
            placeholder="Add meg az email címed"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            placeholder="Add meg a jelszavad"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={cpassword}
            placeholder="Jelszó megerősítése"
            onChange={(e) => setCPassword(e.target.value)}
          />

          <button type="submit">Fiók létrehozása</button>
        </form>
        <p className="bottom-text">
          Már van fiókod? <NavLink to="/login">Jelentkezz be itt</NavLink>
        </p>
      </div>
    </div>
  );
}
