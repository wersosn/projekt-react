import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventService, Event } from '../../event.service';


const StronaAkcji: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState<Event | null>(null);



    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-6 col-md-12 order-md-1">
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
                <div className="col-lg-6 col-md-12 order-md-2">
                    {/* <div className="karta">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {eventDetails && (
                                <>
                                    <h3>{eventDetails.title}</h3>
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
                                    {eventDetails.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {eventDetails.seats}</small>
                                </button>
                            ) : (
                                <div className="btn btn-primary" style={{ width: '100%' }}>
                                    {eventDetails.time}
                                    <br />
                                    <small className="text-white">Liczba miejsc: {eventDetails.seats}</small>
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
                                    <br />
                                    <button className="btn btn-primary w-100 btn-danger" onClick={() => deleteEvent(eventDetails?.id)}>
                                        Usuń wydarzenie
                                    </button>
                                </>
                            )}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default StronaAkcji;
