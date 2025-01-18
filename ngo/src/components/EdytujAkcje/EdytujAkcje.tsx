import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EdytujAkcje.scss';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  seats: number;
}

const EdytujAkcje: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event>({
    id: 0,
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    seats: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Funkcja do pobierania szczegółów wydarzenia
  useEffect(() => {
    if (id) {
      axios
        .get<Event>(`http://localhost:3000/api/events/${id}`)
        .then((response) => {
          setEvent(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Błąd przy pobieraniu danych');
          setIsLoading(false);
        });
    }
  }, [id]);

  // Funkcja do obsługi zmiany w formularzu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Funkcja do zapisania zmodyfikowanego wydarzenia
  const saveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (event.title && event.description && event.date && event.time && event.location && event.seats >= 0) {
      axios
        .put(`http://localhost:3000/api/events/${event.id}`, event)
        .then(() => {
          navigate(`/akcja/szczegóły/${event.id}`);
        })
        .catch(() => {
          setError('Błąd przy aktualizacji danych');
        });
    } else {
      setError('Wszystkie pola są wymagane');
    }
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card">
      <h2>Edycja wydarzenia</h2>
      <form onSubmit={saveEvent}>
        
        {/* Tytuł */}
        <div className="form-group">
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Opis */}
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Data */}
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Godzina */}
        <div className="form-group">
          <label htmlFor="time">Godzina:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Lokacja */}
        <div className="form-group">
          <label htmlFor="location">Lokacja:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Liczba miejsc */}
        <div className="form-group">
          <label htmlFor="seats">Liczba miejsc:</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={event.seats}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        {/* Przycisk */}
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default EdytujAkcje;