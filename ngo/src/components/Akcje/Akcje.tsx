import React from 'react';
import './Akcje.scss';
import { NavLink } from 'react-router-dom';
import Akcja from '../Akcje/Akcja/Akcja';

const Akcje: React.FC = () => {
  return (
    <div>
      <div className="container mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Górna nawigacja */}
        <div className="d-flex justify-content-center mb-2">
          <div className="gn">
            <NavLink to="/akcje" className="btn btn-primary kon">
              Akcje
            </NavLink>
            <NavLink to="/konto" className="btn btn-primary">
              Konto
            </NavLink>
          </div>
        </div>
      </div>
      <h1 style={{ textAlign: 'center' }}>Dostępne Akcje</h1>
      <Akcja />
    </div>
  );
};

export default Akcje;
