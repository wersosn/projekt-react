import axios from 'axios';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  list: string;
  time: string;
}

export class UserEventService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:3000';
  }

  async getUserEvents(userId: number): Promise<Event[]> {
    try {
      const response = await axios.get<Event[]>(`${this.apiUrl}/users/${userId}/events`);
      return response.data;
    } catch (error) {
      console.error('Błąd pobierania wydarzeń użytkownika:', error);
      throw error;
    }
  }
}

export const userEventService = new UserEventService();
