import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventService, Event } from '../../event.service';

const StronaAkcji: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>();
    const [eventDetails, setEventDetails] = useState<Event | undefined>({
        id: 0,
        title: '',
        date: '',
        location: '',
        seats: 0,
        time: '',
        description: ''
    });

    useEffect(() => {
        const loggedIn = localStorage.getItem('userId') !== null;
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const role = localStorage.getItem('userRole');
            setUserRole(role || '');
        }

        const fetchEventDetails = async () => {
            try {
                const eventService = new EventService();
                const event = await eventService.getEventById(Number(id)).toPromise();
                setEventDetails(event);
            } catch (err) {
                console.log('Failed to fetch event details');
            }
        };

        fetchEventDetails();
    }, [id]);

    const joinEvent = () => {
        if (isLoggedIn) {
            const userId = localStorage.getItem('userId');
            const eventId = eventDetails?.id;

            if (userId && eventId) {
                const eventService = new EventService();
                eventService.joinEvent(Number(userId), eventId).subscribe({
                    next: () => {
                        navigate(`/akcja/szczegóły/${eventId}`);
                    },
                    error: (err) => {
                        console.error('Błąd zapisu na wydarzenie:', err);
                        alert('Wystąpił problem przy zapisywaniu.');
                    }
                });
            }
        } else {
            alert('Musisz być zalogowany, aby zapisać się na wydarzenie!');
        }
    };

    const deleteEvent = async (eventId: number) => {
        if (window.confirm('Czy na pewno chcesz usunąć to wydarzenie?')) {
            try {
                const eventService = new EventService();
                await eventService.deleteEvent(eventId).toPromise();
                alert('Wydarzenie zostało usunięte.');
                navigate('/');
            } catch (err) {
                console.error('Błąd podczas usuwania wydarzenia:', err);
                alert('Wystąpił błąd podczas usuwania wydarzenia.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6 col-md-6 order-md-1">
                    <div className="row">
                        <div className="col-12 mb-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://sklep.lambda.pl/userdata/public/gfx/5826/folia-banerowa-na-plandeki-Oracal-seria-451-049-ciemnoniebieska-king-blue.jpg" alt="Obraz" className="img-fluid rounded" />
                        </div>
                        <div className="col-6">
                            <img src="https://sklep.lambda.pl/userdata/public/gfx/5826/folia-banerowa-na-plandeki-Oracal-seria-451-049-ciemnoniebieska-king-blue.jpg" alt="Obraz" className="img-fluid rounded" />
                        </div>
                        <div className="col-6">
                            <img src="https://sklep.lambda.pl/userdata/public/gfx/5826/folia-banerowa-na-plandeki-Oracal-seria-451-049-ciemnoniebieska-king-blue.jpg" alt="Obraz" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 order-md-2">
                    <div className="karta">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {eventDetails && (
                                <>
                                    <h3 style={{ marginRight: '20px' }}>{eventDetails.title}</h3>
                                    <p className="card-subtitle mb-2 text-muted">{eventDetails.date},<br />{eventDetails.location}</p>
                                </>
                            )}
                            {(!eventDetails?.seats || !isLoggedIn) ? (
                                <button className="btn btn-primary btn-sm udz" onClick={joinEvent} disabled>
                                    Weź Udział!
                                </button>
                            ) : (
                                <button className="btn btn-primary btn-sm udz" onClick={joinEvent}>
                                    Weź Udział!
                                </button>
                            )}
                        </div>
                        <hr />
                        <h3>Dostępne godziny</h3>
                        <h6 className="mb-2">Lista podstawowa:</h6>
                        <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
                            {eventDetails?.seats === 0 ? (
                                <button className="btn btn-secondary" style={{ width: '100%' }} disabled>
                                    {eventDetails?.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {eventDetails?.seats}</small>
                                </button>
                            ) : (
                                <div className="btn btn-primary" style={{ width: '100%' }}>
                                    {eventDetails?.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {eventDetails?.seats}</small>
                                </div>
                            )}

                        </div>

                        <div className="karta mt-2">
                            <h3>Opis</h3>
                            <p className="text-muted">
                                {eventDetails?.description}
                            </p>
                            {isLoggedIn && userRole === "administrator" && (
                                <>
                                    <button className="btn btn-primary w-100" onClick={() => navigate(`/akcje/edytuj/${eventDetails?.id}`)}>
                                        Edytuj wydarzenie
                                    </button>
                                    <button className="btn btn-primary w-100 btn-danger" onClick={() => deleteEvent(eventDetails?.id!)}>
                                        Usuń wydarzenie
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StronaAkcji;
