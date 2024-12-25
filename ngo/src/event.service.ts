import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  seats: number;
}

export class EventService {
  private apiUrl = 'http://localhost:3000';
  private eventsUrl = `${this.apiUrl}/api/events`;
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventsSubject.asObservable();

  fetchEvents(): void {
    axios.get<Event[]>(this.eventsUrl).then(response => {
      this.eventsSubject.next(response.data);
    });
  }

  addEvent(event: Event): Promise<Event> {
    return axios.post<Event>(this.eventsUrl, event).then(response => {
      const currentEvents = this.eventsSubject.value;
      this.eventsSubject.next([...currentEvents, response.data]);
      return response.data;
    });
  }

  getEventById(id: number): Promise<Event> {
    return axios.get<Event>(`${this.eventsUrl}/${id}`).then(response => response.data);
  }

  getAllEvents(): Promise<Event[]> {
    return axios.get<Event[]>(this.eventsUrl).then(response => response.data);
  }

  updateEvent(eventId: number, eventData: Partial<Event>): Promise<Event> {
    return axios.put<Event>(`${this.eventsUrl}/${eventId}`, eventData).then(response => response.data);
  }

  deleteEvent(id: number): Promise<void> {
    return axios.delete<void>(`${this.eventsUrl}/${id}`).then(response => response.data);
  }

  joinEvent(userId: number, eventId: number): Promise<void> {
    return axios.get<any>(`${this.apiUrl}/users/${userId}`).then(userResponse => {
      const user = userResponse.data;
      if (user.events.includes(eventId)) {
        alert('Już jesteś zapisany na to wydarzenie!');
        return;
      }
      user.events.push(eventId);
      return axios.put(`${this.apiUrl}/users/${userId}`, user).then(() => {
        return axios.get<Event>(`${this.eventsUrl}/${eventId}`).then(eventResponse => {
          const event = eventResponse.data;
          if (event.seats > 0) {
            event.seats -= 1;
            return axios.put(`${this.eventsUrl}/${eventId}`, event).then(() => {
              alert('Zapisano na wydarzenie!');
            });
          } else {
            alert('Brak dostępnych miejsc!');
          }
        });
      });
    });
  }

  removeEvent(userId: number, eventId: number): Promise<void> {
    return axios.get<any>(`${this.apiUrl}/users/${userId}`).then(userResponse => {
      const user = userResponse.data;
      user.events = user.events.filter((id: number) => id !== eventId);
      return axios.put(`${this.apiUrl}/users/${userId}`, user).then(() => {
        return axios.get<Event>(`${this.eventsUrl}/${eventId}`).then(eventResponse => {
          const event = eventResponse.data;
          event.seats += 1;
          return axios.put(`${this.eventsUrl}/${eventId}`, event).then(() => {
            alert('Usunięto z wydarzenia!');
          });
        });
      });
    });
  }
}
