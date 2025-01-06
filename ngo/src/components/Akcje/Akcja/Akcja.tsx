import React from 'react';
import './Akcja.scss';

const Akcja: React.FC = () => {
  return (
    <div className="container mt-3">
      <div>
        <div className="action-box col-12">
          {/* Szczegóły wydarzenia */}
          <div className="action-details col-2">
            <h3 style={{ fontWeight: 700 }}></h3>
            <p>
              <strong>Data:</strong>
            </p>
            <p>
              <strong>Lokalizacja:</strong>
            </p>
          </div>

          {/* Opis wydarzenia */}
          <div className="col-3">
            <p>
              <strong>Opis:</strong>
            </p>
          </div>

          {/* Informacje dodatkowe */}
          <div className="col-3 text-center">
            <p>Lista:</p>
            <span className="action-time">Time</span>
          </div>

          {/* Przyciski akcji */}
          <div className="action-buttons col-3">
            <button className="btn">
              Zrezygnuj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Akcja;