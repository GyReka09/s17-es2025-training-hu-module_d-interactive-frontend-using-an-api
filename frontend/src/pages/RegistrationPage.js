import { useState } from "react";
import useAuthContext from "../hooks/UseAuthContext";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");

    const { register, errors } = useAuthContext();

  const submit = async (event) => {
    event.preventDefault();
    register({ name, email, password, cpassword });
  };

  return (
    <div className="page">
      <div className="registration">
        <h1>Új fiók létrehozása</h1>
        <form onSubmit={submit}>
          <label>Teljes név</label>
          <input
            type="text"
            value={name}
            placeholder="Add meg a teljes neved"
            onChange={(e) => setname(e.target.value)}
          />
            {errors.name && (
                    <div>
                      <span>{errors.name[0]}</span>
                    </div>
                  )}

          <label>Email Cím</label>
          <input
            type="email"
            value={email}
            placeholder="Add meg az email címed"
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
          <label>Jelszó megerősítése</label>
          <input
            type="password"
            value={cpassword}
            placeholder="Jelszó megerősítése"
            onChange={(e) => setCPassword(e.target.value)}
          />
                {errors.cpassword && (
                  <div>
                    <span>{errors.cpassword[0]}</span>
                  </div>
                )}
          <button type="submit">Fiók létrehozása</button>
        </form>
        <p className="bottom-text">
          Már van fiókod? <Link to="/login">Jelentkezz be itt</Link>
        </p>
      </div>
    </div>
  );
}
