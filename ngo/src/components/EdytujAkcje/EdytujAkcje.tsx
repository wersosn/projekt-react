import React from 'react';
import './EdytujAkcje.scss';

const EdytujAkcje: React.FC = () => {
  return (
    <div>
      <h1>Edytuj Akcję</h1>
      <form>
        <div>
          <label>Nazwa Akcji:</label>
          <input type="text" name="nazwa" required />
        </div>
        <div>
          <label>Opis Akcji:</label>
          <textarea name="opis" required></textarea>
        </div>
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default EdytujAkcje;
