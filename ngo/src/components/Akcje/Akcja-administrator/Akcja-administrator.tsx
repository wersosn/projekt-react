import React, { useState, useEffect } from 'react';
import './Akcja-administrator.scss';
//import DodajUczestnika from './DodajUczestnika';
//import SzukajUczestnika from './SzukajUczestnika';
//import UsunUczestnika from './UsunUczestnika';
import ListaUczestnikow from './lista-uczestnikow/ListaUczestnikow';
import { EventService, Event } from '../../../event.service';

const AkcjaAdministrator: React.FC = () => {
    const [listVisible, setListVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const eventService = new EventService();

    useEffect(() => {
        eventService.getAllEvents().subscribe((data) => {
            setEvents(data);
        });
    }, []);

    const toggleList = () => {
        setRemoveVisible(false);
        setAddVisible(false);
        setListVisible(!listVisible);
    };

    const toggleRemove = () => {
        setListVisible(false);
        setAddVisible(false);
        setRemoveVisible(!removeVisible);
    };

    const toggleAdd = () => {
        setRemoveVisible(false);
        setListVisible(false);
        setAddVisible(!addVisible);
    };

    return (
        <div className="container mt-3">
            {events.map((event) => (
                <div key={event.id} className="action-box col-12">
                    <div className="action-details col-2">
                        <h3>{event.title}</h3>
                        <p><strong>Data:</strong> {event.date}</p>
                        <p><strong>Lokalizacja:</strong> {event.location}</p>
                        <button className="btn">Szczegóły Akcji</button>
                        <button className="btn">Edytuj Akcje</button>
                    </div>
                    <div className="col-3">
                        <p><strong>Opis:</strong> {event.description}</p>
                    </div>
                    <div className="action-buttons col-2">
                        <button className="btn" onClick={toggleList}>Pokaż listy uczestników</button>
                        <button className="btn" onClick={toggleAdd}>Dodaj uczestnika do listy</button>
                        <button className="btn" onClick={toggleRemove}>Usuń uczestnika z listy</button>
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
                </div>
            ))}
            {listVisible && (
                <div className="action-box col-12 mt-3">
                    <ListaUczestnikow eventId={events[1]?.id} />
                </div>
            )}
            {removeVisible && (
                <div className="action-box col-12 mt-3 d-flex flex-column align-items-center">
                    <div className="users-list w-100 mt-3">
                        <div className="user-header">
                            <label className="form-label">ID</label>
                            <label className="form-label">Imię</label>
                            <label className="form-label">Nazwisko</label>
                        </div>
                    </div>
                </div>
            )}
            {addVisible && (
                <div className="action-box col-12 mt-3 d-flex flex-column align-items-center">
                    <div className="users-list w-100 mt-3">
                        <div className="user-header">
                            <label className="form-label">ID</label>
                            <label className="form-label">Imię</label>
                            <label className="form-label">Nazwisko</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AkcjaAdministrator;
