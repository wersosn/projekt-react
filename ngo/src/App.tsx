import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import BlogAkcji from './components/BlogAkcji/BlogAkcji';
import Kalendarz from './components/Kalendarz/Kalendarz';
import Rejestracja from './components/Rejestracja/Rejestracja';
import Logowanie from './components/Logowanie/Logowanie';
import Konto from './components/Konto/Konto';
import Akcje from './components/Akcje/Akcje';
import Akcja from './components/Akcje/Akcja/Akcja';
import AkcjaAdministrator from './components/Akcje/Akcja-administrator/Akcja-administrator';
import StronaAkcji from './components/StronaAkcji/StronaAkcji';
import DodajAkcje from './components/DodajAkcje/DodajAkcje';
import EdytujAkcje from './components/EdytujAkcje/EdytujAkcje';
import Navbar from './components/Navbar';
import './App.scss';


const App = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  };

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar userId={userId} logout={logout} />
          <Routes>
            <Route path="/" element={<BlogAkcji />} />
            <Route path="/kalendarz" element={<Kalendarz />} />
            <Route path="/rejestracja" element={<Rejestracja />} />
            <Route path="/logowanie" element={<Logowanie />} />
            <Route path="/konto" element={<Konto />} />
            <Route path="/akcje" element={<Akcje />} />
            <Route path="/akcja" element={<Akcja />} />
            <Route path="/akcja-administrator" element={<AkcjaAdministrator />} />
            <Route path="/akcja/szczegóły/:id" element={<StronaAkcji />} />
            <Route path="/akcje/dodaj" element={<DodajAkcje />} />
            <Route path="/akcje/edytuj/:id" element={<EdytujAkcje />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;