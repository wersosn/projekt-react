import React, { useState } from 'react';
import UserService, { User } from '../../../../user.service';
import EventService from '../../../../event.service';
import './UsunUczestnika.scss';

interface UsunUczestnikaProps {
    eventId: number;
}

const UsunUczestnika: React.FC<UsunUczestnikaProps> = ({ eventId }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [foundUsers, setFoundUsers] = useState<User[]>([]);

    const findUserInEvent = () => {
        UserService.getUsers().then(users => {
            let foundUsers: User[] = [];

            if (!name && !surname) {
                foundUsers = users.filter(user => user.role === 'user' && user.events.includes(eventId));
                setFoundUsers(foundUsers);
                return;
            }

            users.forEach(user => {
                if (
                    user.role === 'user' &&
                    (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
                    (!surname || user.surname.toLowerCase().includes(surname.toLowerCase())) &&
                    user.events.includes(eventId)
                ) {
                    foundUsers.push(user);
                }
            });

            setFoundUsers(foundUsers);
        });
    };

    const removeUserFromEvent = (userId: number) => {
        EventService.removeEvent(userId, eventId).subscribe({
            next: () => {
                alert('Użytkownik został usunięty z akcji.');
                findUserInEvent(); // Odśwież listę użytkowników
            },
            error: (err) => {
                console.error('Błąd usuwania z wydarzenia:', err);
                alert('Wystąpił problem przy usuwaniu.');
            }
        });
    };

    return (
        <div className="search-container">
            <label className="form-label text-center">
                Podaj imię i nazwisko użytkownika:<br />
                <label className="smallform-label text-center">Brak danych wyświetli wszystkie osoby</label>
            </label>
            <div className="input-group">
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Imię" />
                <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Nazwisko" />
            </div>
            <button onClick={findUserInEvent}>Szukaj</button>
            <div className="user-list">
                {foundUsers.map(user => (
                    <div key={user.id} className="user-item">
                        <span className="data-box">{user.name} {user.surname}</span>
                        <button onClick={() => removeUserFromEvent(user.id)}>Usuń</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsunUczestnika;
