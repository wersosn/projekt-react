import React from 'react';
import './DodajAkcje.scss';

const DodajAkcje: React.FC = () => {
  return (
    <div className="card">
      <p>Dodawanie akcji</p>
      <form>
        {/* Tytuł */}
        <div className="form-group">
          <label htmlFor="title">Tytuł:</label>
          <input type="text" id="title" name="title" />
        </div>

        {/* Opis */}
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <input type="text" id="description" name="description" />
        </div>

        {/* Data */}
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input type="date" id="date" name="date" />
        </div>

        {/* Godzina */}
        <div className="form-group">
          <label htmlFor="time">Godzina:</label>
          <input type="time" id="time" name="time" />
        </div>

        {/* Lokacja */}
        <div className="form-group">
          <label htmlFor="location">Lokacja:</label>
          <input type="text" id="location" name="location" />
        </div>

        {/* Liczba miejsc */}
        <div className="form-group">
          <label htmlFor="seats">Liczba miejsc:</label>
          <input type="number" id="seats" name="seats" min="1" />
        </div>

        {/* Przycisk wysyłania */}
        <button type="submit">Stwórz akcję</button>
      </form>
    </div>
  );
};

export default DodajAkcje;
