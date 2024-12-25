import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogAkcji from './components/BlogAkcji/BlogAkcji';
import Kalendarz from './components/Kalendarz/Kalendarz';
import Rejestracja from './components/Rejestracja/Rejestracja';
import Logowanie from './components/Logowanie/Logowanie';
import Konto from './components/Konto/Konto';
import Akcje from './components/Akcje/Akcje';
import StronaAkcji from './components/StronaAkcji/StronaAkcji';
import DodajAkcje from './components/DodajAkcje/DodajAkcje';
import EdytujAkcje from './components/EdytujAkcje/EdytujAkcje';
import Navbar from './components/Navbar';
import './App.scss';

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const logout = () => {
    setUserId(null);
   
  };

  return (
    <>
      <Router>
        <Navbar userId={userId} logout={logout} />
        <Routes>
          <Route path="/" element={<BlogAkcji />} />
          <Route path="/kalendarz" element={<Kalendarz />} />
          <Route path="/rejestracja" element={<Rejestracja />} />
          <Route path="/logowanie" element={<Logowanie />} />
          <Route path="/konto" element={<Konto />} />
          <Route path="/akcje" element={<Akcje />} />
          <Route path="/akcja/szczegóły/:id" element={<StronaAkcji />} />
          <Route path="/akcje/dodaj" element={<DodajAkcje />} />
          <Route path="/akcje/edytuj/:id" element={<EdytujAkcje />} />
          <Route path="*" element={<Logowanie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;