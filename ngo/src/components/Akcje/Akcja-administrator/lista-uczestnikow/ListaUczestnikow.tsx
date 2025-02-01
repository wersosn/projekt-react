import React, { useEffect, useState } from 'react';
import UserService from '../../../../user.service';

interface ListaUczestnikowProps {
  eventId: number;
}

interface User {
  id: number;
  role: string;
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  events: number[];
}

const ListaUczestnikow: React.FC<ListaUczestnikowProps> = ({ eventId }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getUsers().then(users => {
      const filteredUsers = users.filter(user => user.events.includes(eventId));
      console.log(eventId);
      setUsers(filteredUsers);
    });
  }, [eventId]);

  return (
    <div className="user-list">
      <div className="user-header">
        <label className="form-label id-label">ID</label>
        <label className="form-label">Imię</label>
        <label className="form-label">Nazwisko</label>
      </div>
      {users.map(user => (
        <div className="user-item" key={user.id}>
          <span className="data-box id-box">{user.id}</span>
          <span className="data-box">{user.name}</span>
          <span className="data-box">{user.surname}</span>
        </div>
      ))}
    </div>
  );
};

export default ListaUczestnikow;
