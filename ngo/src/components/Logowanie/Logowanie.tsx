import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logowanie.scss';

// Typ danych zwracanych przez API
interface LoginResponse {
  message: string;
  user: {
    id: number;
    login: string;
    role: string;
  };
}

const Logowanie = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ login: false, password: false });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validate = () => ({
      login: login.length === 0,
      password: password.length === 0,
    });

    const errors = validate();
    if (errors.login || errors.password) {
      alert('Proszę uzupełnić wymagane pola.');
      return;
    }

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/login', { login, password });
      const data = response.data;
      alert(data.message);
      localStorage.setItem('userId', data.user.id.toString());
      localStorage.setItem('userLogin', data.user.login);
      localStorage.setItem('userRole', data.user.role);
      navigate('/konto');
      window.location.reload();
    } catch (err: any) {
      console.error('Błąd logowania:', err);
      alert(err.response?.data?.message || 'Wystąpił błąd podczas logowania.');
    }
  };

  const handleBlur = (field: string) => () => {
    setTouched({ ...touched, [field]: true });
  };

  const validate = () => ({
    login: login.length === 0,
    password: password.length === 0,
  });

  const errors = validate();

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="login-container card p-4 shadow-sm">
        <h2 className="text-center mb-4">Zaloguj się na swoje konto</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <div className="mb-3 col-10">
            <label htmlFor="login" className="form-label">Login</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onBlur={handleBlur('login')}
              className="form-control"
              placeholder="Wprowadź login"
            />
            {touched.login && errors.login && (
              <div className="text-danger">Login jest wymagany</div>
            )}
          </div>
          <div className="mb-3 col-10">
            <label htmlFor="password" className="form-label">Hasło</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur('password')}
              className="form-control"
              placeholder="Wprowadź hasło"
            />
            {touched.password && errors.password && (
              <div className="text-danger">Hasło jest wymagane</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-75 mt-3">Zaloguj się</button>
        </form>
        <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
          Nie jesteś zweryfikowany? <a href="/rejestracja">Zarejestruj się</a>
        </p>
      </div>
    </div>
  );
};

export default Logowanie;