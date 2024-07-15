import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    // Add your password validation logic here if needed
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError("Senha deve possuir no mínimo seis caracteres");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch(process.env.COIN_API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "Ok!") {
        localStorage.setItem("auth", data.result.token);
        navigate("/currency");
      } else {
        setLoginError("Login falhou. Tente novamente.");
      }
    } catch (error) {
      setLoginError("Login falhou. Tente novamente.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="login">Login</button>
          <button onClick={handleRegister} className="register">Registrar</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
