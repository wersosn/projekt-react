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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!event.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany.';
    }
    if (!event.description.trim()) {
      newErrors.description = 'Opis jest wymagany.';
    }
    if (!event.date) {
      newErrors.date = 'Data jest wymagana.';
    }
    if (!event.time) {
      newErrors.time = 'Godzina jest wymagana.';
    }
    if (!event.location.trim()) {
      newErrors.location = 'Lokacja jest wymagana.';
    }
    if (event.seats < 1) {
      newErrors.seats = 'Liczba miejsc musi być większa od 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .put(`http://localhost:3000/api/events/${event.id}`, event)
        .then(() => {
          navigate(`/akcja/szczegóły/${event.id}`);
        })
        .catch(() => {
          setError('Błąd przy aktualizacji danych');
        });
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
          />
          {errors.title && <small className="text-danger">{errors.title}</small>}
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
          />
          {errors.description && <small className="text-danger">{errors.description}</small>}
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
          />
          {errors.date && <small className="text-danger">{errors.date}</small>}
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
          />
          {errors.time && <small className="text-danger">{errors.time}</small>}
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
          />
          {errors.location && <small className="text-danger">{errors.location}</small>}
        </div>

        {/* Liczba miejsc */}
        <div className="form-group">
          <label htmlFor="seats">Liczba miejsc:</label>
          <input
            type="number"
            id="seats"
            name="seats"
            min="1"
            value={event.seats}
            onChange={handleChange}
          />
          {errors.seats && <small className="text-danger">{errors.seats}</small>}
        </div>

        {/* Przycisk */}
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default EdytujAkcje;