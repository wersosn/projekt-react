import React, { useEffect, useState } from 'react';
import { userEventService, Event } from '../../../userEvent.service';
import { EventService } from '../../../event.service';
import { useNavigate } from 'react-router-dom';
import './Akcja.scss';

const Akcja: React.FC = () => {
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const eventService = new EventService();

  useEffect(() => {
    const fetchUserEvents = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const events = await userEventService.getUserEvents(Number(userId));
          setUserEvents(events);
        } catch (error) {
          setError('Wystąpił problem przy ładowaniu wydarzeń użytkownika.');
        }
      } else {
        setError('Musisz być zalogowany, aby zobaczyć zapisane wydarzenia!');
      }
    };

    fetchUserEvents();
  }, []);

  // Funkcja do rezygnacji z wydarzenia
  const cancelEvent = async (eventId: number) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await eventService.removeEvent(Number(userId), eventId).toPromise();
        setUserEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        alert('Zrezygnowałeś z udziału w wydarzeniu!');
      } catch (error) {
        alert('Wystąpił problem przy rezygnacji.');
      }
    }
  };

  return (
    <div className="container mt-3">
        <div>
          {userEvents.map((event) => (
            <div key={event.id} className="action-box col-12">
              <div className="action-details col-2">
                <h3 style={{ fontWeight: 700 }}>{event.title}</h3>
                <p><strong>Data:</strong> {event.date}</p>
                <p><strong>Lokalizacja:</strong> {event.location}</p>
              </div>
              <div className="col-3">
                <p><strong>Opis:</strong> {event.description}</p>
              </div>
              <div className="col-3 text-center">
                <p>Lista {event.list}:</p>
                <span className="action-time">{event.time}</span>
              </div>
              <div className="action-buttons col-3">
                <button className="btn btn-danger" onClick={() => cancelEvent(event.id)}>
                  Zrezygnuj
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Akcja;