import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventService } from '../../event.service'; 
import './DodajAkcje.scss';


const DodajAkcje: React.FC = () => {
  const eventService = new EventService();
  const navigate = useNavigate();

  const [newEvent, setNewEvent] = useState({
    id: Date.now(),
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    seats: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newEvent.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany.';
    }
    if (!newEvent.description.trim()) {
      newErrors.description = 'Opis jest wymagany.';
    }
    if (!newEvent.date) {
      newErrors.date = 'Data jest wymagana.';
    }
    if (!newEvent.time) {
      newErrors.time = 'Godzina jest wymagana.';
    }
    if (!newEvent.location.trim()) {
      newErrors.location = 'Lokacja jest wymagana.';
    }
    if (newEvent.seats < 1) {
      newErrors.seats = 'Liczba miejsc musi być większa od 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
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
          setErrors({});
          navigate("/");
        },
        error: () => {
          alert('Błąd podczas tworzenia akcji.');
        },
      });
    }
  };

  return (
    <div className="card">
      <p>Dodawanie akcji</p>
      <form onSubmit={handleSubmit}>
        {/* Tytuł */}
        <div className="form-group">
          <label htmlFor="title">Tytuł:</label>
          <input type="text" id="title" name="title" value={newEvent.title} onChange={handleChange}/>
          {errors.title && <small className="text-danger">{errors.title}</small>}
        </div>

        {/* Opis */}
        <div className="form-group">
          <label htmlFor="description">Opis:</label>
          <input type="text" id="description" name="description" value={newEvent.description} onChange={handleChange} />
          {errors.description && <small className="text-danger">{errors.description}</small>}
        </div>

        {/* Data */}
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input type="date" id="date" name="date" value={newEvent.date} onChange={handleChange}/>
          {errors.date && <small className="text-danger">{errors.date}</small>}
        </div>

        {/* Godzina */}
        <div className="form-group">
          <label htmlFor="time">Godzina:</label>
          <input type="time" id="time" name="time" value={newEvent.time} onChange={handleChange} />
          {errors.time && <small className="text-danger">{errors.time}</small>}
        </div>

        {/* Lokacja */}
        <div className="form-group">
          <label htmlFor="location">Lokacja:</label>
          <input type="text" id="location" name="location" value={newEvent.location} onChange={handleChange} />
          {errors.location && <small className="text-danger">{errors.location}</small>}
        </div>

        {/* Liczba miejsc */}
        <div className="form-group">
          <label htmlFor="seats">Liczba miejsc:</label>
          <input type="number" id="seats" name="seats" min="1" value={newEvent.seats} onChange={handleChange} />
          {errors.seats && <small className="text-danger">{errors.seats}</small>}
        </div>

        {/* Przycisk wysyłania */}
        <button type="submit">Stwórz akcję</button>
      </form>
    </div>
  );
};
export default DodajAkcje;