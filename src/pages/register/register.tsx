import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss';


const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setRegisterError('');

    let valid = true;

    if (name.trim() === '') {
      setNameError('Preencha o nome');
      valid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Email inválido');
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Senha deve possuir no mínimo seis caracteres');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch(process.env.COIN_API_URL + "/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();

      if (data.status === 'Ok!') {
        localStorage.setItem('auth', data.result.token);
        navigate('/currency');
      } else {
        setRegisterError('Registrar falhor. Tente novamente.');
      }
    } catch (error) {
      setRegisterError('Registrar falhor. Tente novamente.');
    }
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Registrar</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="auth">Registrar</button>
          {registerError && <p className="error-message">{registerError}</p>}
          <h6 onClick={handleLogin} className="login">Crie sua conta</h6>
        </form>
      </div>
    </div>
  );
};

export default Register;