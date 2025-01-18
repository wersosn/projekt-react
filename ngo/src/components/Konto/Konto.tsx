import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './Konto.scss';

const Konto: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Błąd podczas pobierania danych użytkownika:', error);
        });
    } else {
      console.error('Brak ID użytkownika w localStorage');
      navigate('/logowanie');
    }
  }, [navigate]);

  if (!userData) {
    return <div>Ładowanie danych użytkownika...</div>;
  }

  return (
    <>
      <div className="container mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Górna nawigacja */}
        <div className="d-flex justify-content-center mb-2">
          <div className="gn">
            <NavLink to="/akcje" className="btn btn-primary">
              Akcje
            </NavLink>
            <NavLink to="/konto" className="btn btn-primary kon">
              Konto
            </NavLink>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-4">Twoje konto</h1>

      {/* Główna sekcja */}
      <div className="karta main-section">
        <div className="card-body">
          {/* Dane osobowe */}
          <h3 className="mb-3">Dane osobowe:</h3>
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label text-center w-100">Login</label>
              <div className="data-box">
                <span>{userData.login}</span>
              </div>
            </div>
            <div className="col-md-5">
              <label className="form-label text-center w-100">Hasło</label>
              <div className="data-box">
                <span>{userData.password}</span>
              </div>
            </div>
            <div className="col-md-2">
              <label className="form-label text-center w-100">Płeć</label>
              <div className="data-box">
                <span>{userData.gender}</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Imię</label>
              <div className="data-box">
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Nazwisko</label>
              <div className="data-box">
                <span>{userData.surname}</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Telefon</label>
              <div className="data-box">
                <span>{userData.phone}</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Email</label>
              <div className="data-box">
                <span>{userData.email}</span>
              </div>
            </div>
            <div className="col-md-12">
              <label className="form-label text-center w-100">Adres</label>
              <div className="data-box">
                <span>{userData.address}</span>
              </div>
            </div>
          </div>
        </div>
        <>
          <hr />
          <NavLink to="/akcje/dodaj" className="btn btn-primary w-100">
            Dodaj akcje
          </NavLink>
        </>
      </div>
    </>
  );
};

export default Konto;