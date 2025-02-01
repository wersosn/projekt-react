import React, { useEffect, useState } from 'react';
import UserService, { User } from '../../../../user.service';
import './ListaUczestnikow.scss';

interface ListaUczestnikowProps {
    eventId: number;
}

const ListaUczestnikow: React.FC<ListaUczestnikowProps> = ({ eventId }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await UserService.getUsersByEvent(eventId);
            console.log(users);
            setUsers(users);
        };

        fetchUsers();
    }, [eventId]);

    return (
        <div className="action-box col-12 mt-3 d-flex flex-column align-items-center">
            <div className="users-list w-100 mt-3">
                <div className="user-header">
                    <label className="form-label">ID</label>
                    <label className="form-label">Imię</label>
                    <label className="form-label">Nazwisko</label>
                </div>
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <div className="data-box">{user.id}</div>
                        <div className="data-box">{user.name}</div>
                        <div className="data-box">{user.surname}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaUczestnikow;
