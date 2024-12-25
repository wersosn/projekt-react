import React from 'react';
import './Logowanie.scss';

const Logowanie: React.FC = () => {
  return (
    <div>
      <h1>Logowanie</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="haslo">Hasło:</label>
          <input type="password" id="haslo" required />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Logowanie;
