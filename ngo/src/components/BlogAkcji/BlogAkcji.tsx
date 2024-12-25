import React, { useEffect, useState } from 'react';
import { EventService, Event } from '../../event.service'
import './BlogAkcji.scss';
import { Link } from 'react-router-dom';

const BlogAkcji: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [sortDirectionDate, setSortDirectionDate] = useState<'asc' | 'desc'>('asc');
  const [sortDirectionSeats, setSortDirectionSeats] = useState<'asc' | 'desc'>('asc');
  const [activeSortByDate, setActiveSortByDate] = useState<boolean>(false);
  const [activeSortBySeats, setActiveSortBySeats] = useState<boolean>(false);

  useEffect(() => {
    fetchAndSetEvents();
  }, []);

  const fetchAndSetEvents = () => {
    const eventService = new EventService();
    eventService.fetchEvents();
    eventService.events$.subscribe(events => {
      setEvents(events);
      setAllEvents([...events]);
    });
  };

  const sortByDate = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDirectionDate === 'asc' ? diff : -diff;
    });
    setEvents(sortedEvents);
    setSortDirectionDate(sortDirectionDate === 'asc' ? 'desc' : 'asc');
    setActiveSortByDate(true);
    setActiveSortBySeats(false);
  };

  const sortBySeats = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const diff = a.seats - b.seats;
      return sortDirectionSeats === 'asc' ? diff : -diff;
    });
    setEvents(sortedEvents);
    setSortDirectionSeats(sortDirectionSeats === 'asc' ? 'desc' : 'asc');
    setActiveSortBySeats(true);
    setActiveSortByDate(false);
  };

  const resetOrder = () => {
    setEvents([...allEvents]);
    setActiveSortByDate(false);
    setActiveSortBySeats(false);
  };

  const toggleFilterSeats = () => {
    if (isFiltered) {
      setEvents([...allEvents]);
    } else {
      setEvents(allEvents.filter(event => event.seats > 0));
    }
    setIsFiltered(!isFiltered);
  };

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between">
        <h1 style={{ color: '#388dd8', fontSize: '3.6em' }} className="mt-3">Blog akcji</h1>
        <div className="mb-3 text-center">
          <h5>Sortowanie</h5>
          <button className={`btn me-2 ${activeSortByDate ? 'btn-primary' : 'btn-outline-primary'}`} onClick={sortByDate}>
            Sortuj wg daty ({sortDirectionDate === 'asc' ? 'Bliższe' : 'Dalsze'})
          </button>
          <button className={`btn me-2 ${activeSortBySeats ? 'btn-primary' : 'btn-outline-primary'}`} onClick={sortBySeats}>
            Sortuj wg liczby miejsc ({sortDirectionSeats === 'asc' ? 'Więcej miejsc' : 'Mniej miejsc'})
          </button>
          <h5>Filtrowanie</h5>
          <button className="btn btn-outline-primary me-2" onClick={resetOrder}>Przywróć oryginalne ułożenie</button>
          <button className="btn btn-outline-primary" onClick={toggleFilterSeats}>
            {isFiltered ? 'Pokaż wszystkie wydarzenia' : 'Ukryj wydarzenia bez miejsc'}
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card h-100">
              <img src="https://sklep.lambda.pl/userdata/public/gfx/b5ba5b93de162471a3a920ca9f91bb5d.jpg" alt="Akcja obraz" className="card-image img-fluid" />
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="card-text">{event.date} - {event.location}</p>
                <div className="card-footer mt-3">
                  <p className="card-description">{event.description}</p>
                  <p><strong>Miejsca:</strong> {event.seats}</p>
                  <Link className="btn btn-primary w-100" to={`/akcja/szczegóły/${event.id}`}>Przejdź do akcji</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAkcji;
