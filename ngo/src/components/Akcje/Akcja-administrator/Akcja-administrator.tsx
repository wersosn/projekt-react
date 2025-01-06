import React from 'react';
import './Akcja-administrator.scss';

const AkcjaAdministrator: React.FC = () => {
    return (
        <div className="container mt-3">
            <div className="action-box col-12">
                <div className="action-details col-2">
                    <h3>Tytuł Wydarzenia</h3>
                    <p><strong>Data:</strong> 2025-01-06</p>
                    <p><strong>Lokalizacja:</strong> Warszawa</p>
                    <button className="btn">Szczegóły Akcji</button>
                    <button className="btn">Edytuj Akcje</button>
                    <button className="btn">Usuń wydarzenie</button>
                </div>
                <div className="col-3">
                    <p><strong>Opis:</strong> To jest opis wydarzenia.</p>
                </div>
                <div className="action-buttons col-2">
                    <button className="btn">Pokaż listy uczestników</button>
                    <button className="btn">Dodaj uczestnika do listy</button>
                    <button className="btn">Usuń uczestnika z listy</button>
                </div>

                <div className="col-4 text-center">
                    <h6 className="mb-2">Lista podstawowa:</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
                        <button type="button" className="btn btn-primary">
                            12:00
                            <br />
                            <small className="text-white">Liczba miejsc: 10</small>
                        </button>
                    </div>
                </div>
            </div>


            <div className="action-box col-12 mt-3">
                <div className="users-list w-100 mt-3">
                    <div className="user-header">
                        <label className="form-label">ID</label>
                        <label className="form-label">Imię</label>
                        <label className="form-label">Nazwisko</label>
                    </div>
                    <div className="user-item mb-2">
                        <span>1</span>
                        <span>Jan</span>
                        <span>Kowalski</span>
                    </div>
                    <div className="user-item mb-2">
                        <span>2</span>
                        <span>Anna</span>
                        <span>Nowak</span>
                    </div>
                </div>
            </div>

            <div className="action-box col-12 mt-3">
                <div className="users-list w-100 mt-3">
                    <div className="user-header">
                        <label className="form-label">ID</label>
                        <label className="form-label">Imię</label>
                        <label className="form-label">Nazwisko</label>
                    </div>
                    <div className="user-item col-12 mb-2">
                        <span>3</span>
                        <span>Piotr</span>
                        <span>Wiśniewski</span>
                    </div>
                    <div className="user-item col-12 mb-2">
                        <span>4</span>
                        <span>Maria</span>
                        <span>Zielińska</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AkcjaAdministrator;
