import React, { useState } from 'react';
import { EventService } from '../../event.service'; 
import './DodajAkcje.scss';


const DodajAkcje: React.FC = () => {
  const eventService = new EventService();

  const [newEvent, setNewEvent] = useState({
    id: Date.now(),
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    seats: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      eventService.addEvent(newEvent).subscribe({
        next: () => {
          alert('Akcja została stworzona!');
          setNewEvent({
            id: Date.now(),
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            seats: 1,
          });
        },
      });
    };

  return (
    <div className="card">
      <p>Dodawanie akcji</p>
      <form onSubmit={handleSubmit}>
        {/* Tytuł */}
        <div className="form-group">
          <label htmlFor="title">Tytuł:</label>
          <input type="text" id="title" name="title" value={newEvent.title} onChange={handleChange}/>
        </div>

        {/* Opis */}
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <input type="text" id="description" name="description" value={newEvent.description} onChange={handleChange} />
        </div>

        {/* Data */}
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input type="date" id="date" name="date" value={newEvent.date} onChange={handleChange}/>
        </div>

        {/* Godzina */}
        <div className="form-group">
          <label htmlFor="time">Godzina:</label>
          <input type="time" id="time" name="time" value={newEvent.time} onChange={handleChange} />
        </div>

        {/* Lokacja */}
        <div className="form-group">
          <label htmlFor="location">Lokacja:</label>
          <input type="text" id="location" name="location" value={newEvent.location} onChange={handleChange} />
        </div>

        {/* Liczba miejsc */}
        <div className="form-group">
          <label htmlFor="seats">Liczba miejsc:</label>
          <input type="number" id="seats" name="seats" min="1" value={newEvent.seats} onChange={handleChange} />
        </div>

        {/* Przycisk wysyłania */}
        <button type="submit">Stwórz akcję</button>
      </form>
    </div>
  );
};
export default DodajAkcje;