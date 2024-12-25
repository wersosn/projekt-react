import React from 'react';
import './Rejestracja.scss';
const Rejestracja = () => {
  return (
    <div className="container-cols-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="register-container">
        <h1 className="text-center mb-4">Podaj dane do rejestracji</h1>
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="login" className="form-label">Login</label>
              <input type="text" className="form-control" id="login" required />
         
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Hasło</label>
              <input type="password" className="form-control" id="password" required />
          
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">Imię</label>
              <input type="text" className="form-control" id="firstName" required />
            
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Nazwisko</label>
              <input type="text" className="form-control" id="lastName" required />
           
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
          
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Telefon</label>
              <input type="tel" className="form-control" id="phone" required />
         
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Adres</label>
            <input type="text" className="form-control" id="address" required />
         
          </div>

          <div className="row mb-3">
            <label className="col-4 form-label">Płeć</label>
            <div className="col-8 d-flex">
              <div className="form-check me-3">
                <input className="form-check-input" type="radio" name="gender" value="M" required />
                <label className="form-check-label" htmlFor="genderM">M</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="F" required />
                <label className="form-check-label" htmlFor="genderF">F</label>
              </div>
            </div>
           
          </div>

          <button type="submit" className="btn btn-primary w-100" >Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
};

export default Rejestracja;