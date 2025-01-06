import React from 'react';
import './Konto.scss';
import { NavLink } from 'react-router-dom';

const Konto: React.FC = () => {
  return (
    <div className="container mt-2">
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
      <h1 className="text-center mb-4">Twoje konto</h1>

      {/* Główna sekcja */}
      <div className="karta">
        <div className="card-body">
          {/* Dane osobowe */}
          <h3 className="mb-3">Dane osobowe:</h3>
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label text-center w-100">Login</label>
              <div className="data-box">
                <span>Login</span>
              </div>
            </div>
            <div className="col-md-5">
              <label className="form-label text-center w-100">Hasło</label>
              <div className="data-box">
                <span>Password</span>
              </div>
            </div>
            <div className="col-md-2">
              <label className="form-label text-center w-100">Płeć</label>
              <div className="data-box">
                <span>Gender</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Imię</label>
              <div className="data-box">
                <span>Name</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Nazwisko</label>
              <div className="data-box">
                <span>Surname</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Telefon</label>
              <div className="data-box">
                <span>Phone number</span>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-center w-100">Email</label>
              <div className="data-box">
                <span>Email</span>
              </div>
            </div>
            <div className="col-md-12">
              <label className="form-label text-center w-100">Adres</label>
              <div className="data-box">
                <span>Address</span>
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
    </div>
  );
};

export default Konto;
