import React from 'react';
import './DodajAkcje.scss';

const DodajAkcje: React.FC = () => {
  return (
    <div>
      <h1>Dodaj Nową Akcję</h1>
      <form>
        <div>
          <label>Nazwa Akcji:</label>
          <input type="text" name="nazwa" required />
        </div>
        <div>
          <label>Opis Akcji:</label>
          <textarea name="opis" required></textarea>
        </div>
        <button type="submit">Dodaj Akcję</button>
      </form>
    </div>
  );
};

export default DodajAkcje;
