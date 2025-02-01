import axios from 'axios';

/**
 @ignore
 */
export interface User {
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

class UserService {
  /**
     * Domyślne opcje kalendarza
     */
  private userUrl = 'http://localhost:3000/users'; // URL do serwera JSON

  /**
   * Pobiera wszystkich użytkowników z backendu
   */
  async getUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${this.userUrl}`);
    return response.data;
  }

  /**
  * Pobiera dane użytkownika na podstawie jego ID
  */
  async getUserData(userId: number): Promise<User> {
    const response = await axios.get<User>(`${this.userUrl}/${userId}`);
    return response.data;
  }

  /**
   * Pobiera szczegóły użytkownika, w tym jego ID, rolę, login oraz email
   */
  async getUserDetails(userId: string): Promise<{ id: number; role: string; login: string; email: string }> {
    const response = await axios.get<{ id: number; role: string; login: string; email: string }>(`${this.userUrl}/${userId}`);
    return response.data;
  }

  /**
   * Pobiera użytkowników na podstawie ID wydarzenia
   */
  async getUsersByEvent(eventId: number): Promise<User[]> {
    const response = await axios.get<User[]>(`${this.userUrl}`);
    return response.data.filter(user => user.events.includes(eventId));
  }
}

export default new UserService();
