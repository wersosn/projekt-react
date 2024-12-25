import React from 'react';
import './Rejestracja.scss';

const Rejestracja: React.FC = () => {
  return (
    <div>
      <h1>Rejestracja</h1>
      <form>
        <div>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Rejestracja;
