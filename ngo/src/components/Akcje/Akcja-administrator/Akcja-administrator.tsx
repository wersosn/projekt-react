import React, { useState, useEffect } from 'react';
import './Akcja-administrator.scss';
import { useNavigate } from 'react-router-dom';
//import DodajUczestnika from './DodajUczestnika';
import DodajUczestnika from './dodaj-uczestnika/DodajUczestnika';
//import UsunUczestnika from './UsunUczestnika';
import ListaUczestnikow from './lista-uczestnikow/ListaUczestnikow';
import './lista-uczestnikow/ListaUczestnikow.scss';
import { User } from '../../../user.service';
import { EventService, Event } from '../../../event.service';
import UsunUczestnika from './usun-uczestnika/UsunUczestnika';

const AkcjaAdministrator: React.FC = () => {
    const [listVisible, setListVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [foundUsers, setFoundUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const eventService = new EventService();
    const navigate = useNavigate();

    useEffect(() => {
        eventService.getAllEvents().subscribe((data) => {
            setEvents(data);
        });
    }, []);

    const toggleList = (eventId: number, view: number) => {
        if (selectedEventId === eventId) {
            setListVisible(view === 1 ? !listVisible : false);
            setAddVisible(view === 2 ? !addVisible : false);
            setRemoveVisible(view === 3 ? !removeVisible : false);
        } else {
            setListVisible(view === 1);
            setAddVisible(view === 2);
            setRemoveVisible(view === 3);
        }
        setSelectedEventId(eventId);
    };

    const goToDetails = (id: number) => {
        navigate(`/akcja/szczegóły/${id}`);
    };

    const goToEdit = (id: number) => {
        navigate(`/akcje/edytuj/${id}`);
    };

    return (
        <div className="container mt-3">
            {events.map((event) => (
                <div key={event.id} className="action-box col-12">
                    <div className="action-details col-2">
                        <h3>{event.title}</h3>
                        <p><strong>Data:</strong> {event.date}</p>
                        <p><strong>Lokalizacja:</strong> {event.location}</p>
                        <button className="btn" onClick={() => goToDetails(event.id)}>Szczegóły Akcji</button>
                        <button className="btn" onClick={() => goToEdit(event.id)}>Edytuj Akcje</button>
                    </div>
                    <div className="col-3">
                        <p><strong>Opis:</strong> {event.description}</p>
                    </div>
                    <div className="action-buttons col-2">
                        <button className="btn" onClick={() => toggleList(event.id,1)}>Pokaż listy uczestników</button>
                        <button className="btn" onClick={() =>toggleList(event.id,2)}>Dodaj uczestnika do listy</button>
                        <button className="btn" onClick={() =>toggleList(event.id,3)}>Usuń uczestnika z listy</button>
                    </div>
                    <div className="col-4 text-center">
                        <h6 className="mb-2">Lista podstawowa:</h6>
                        <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
                            {event.seats <= 0 ? (
                                <button type="button" className="btn btn-secondary">
                                    {event.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {event.seats}</small>
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary">
                                    {event.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {event.seats}</small>
                                </button>
                            )}
                        </div>
                    </div>

                    {listVisible && selectedEventId === event.id && (
                        <div className="col-12">
                            <ListaUczestnikow eventId={selectedEventId} />
                        </div>
                    )}
                    {addVisible && selectedEventId === event.id && (
                        <div className="col-12">
                           <DodajUczestnika eventId={selectedEventId} />
                        </div>
                    )}
                    {removeVisible && selectedEventId === event.id && (
                        <div className="col-12">
                            <UsunUczestnika eventId={selectedEventId} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AkcjaAdministrator;
