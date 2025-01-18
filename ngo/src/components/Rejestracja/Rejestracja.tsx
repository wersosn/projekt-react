import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Rejestracja.scss';

const Rejestracja: React.FC = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.login || formData.login.length < 3) {
      newErrors.login = 'Login musi mieć co najmniej 3 znaki.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków.';
    }
    if (!formData.firstName) {
      newErrors.firstName = 'Imię jest wymagane.';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Nazwisko jest wymagane.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Podaj poprawny adres email.';
    }
    if (!formData.phone || !/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Podaj poprawny numer telefonu (9 cyfr).';
    }
    if (!formData.address) {
      newErrors.address = 'Adres jest wymagany.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Wybierz płeć.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('http://localhost:3000/register', formData)
        .then(() => {
          alert('Rejestracja zakończona sukcesem!');
          navigate('/logowanie');
        })
        .catch((error) => {
          alert('Błąd rejestracji: ' + error.message);
        });
    }
  };

  return (
    <div className="container-cols-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="register-container">
        <h1 className="text-center mb-4">Podaj dane do rejestracji</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="login" className="form-label">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
              />
              {errors.login && <small className="text-danger">{errors.login}</small>}
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Hasło</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">Imię</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Nazwisko</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Telefon</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Adres</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </div>

          <div className="row mb-3">
            <label className="col-4 form-label">Płeć</label>
            <div className="col-8 d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === 'M'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderM">M</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === 'F'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderF">F</label>
              </div>
            </div>
            {errors.gender && <small className="text-danger">{errors.gender}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
};

export default Rejestracja;