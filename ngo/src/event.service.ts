
import { BehaviorSubject, Observable } from 'rxjs';

import axios from 'axios';
/**
  @ignore
  */
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
  /**@ignore*/
  private apiUrl = 'http://localhost:3000';
  /**@ignore*/
  private eventsUrl = 'http://localhost:3000/api/events'; // Endpoint API
  /**@ignore*/
  private eventsSubject = new BehaviorSubject<Event[]>([]); // Strumień wydarzeń
  events$ = this.eventsSubject.asObservable(); // Subskrybowalne dane
  /**@ignore*/
  constructor() { }

  /**
    * Zwraca bieżące wydarzenia (dane zapisane w BehaviorSubject)
    * @returns Event[] - Tablica wydarzeń
    */
  getEvents(): Event[] {
    return this.eventsSubject.value;
  }
  /**
   * Pobiera wydarzenia z serwera i aktualizuje BehaviorSubject
   */
  fetchEvents(): void {
    axios.get<Event[]>('http://localhost:3000/api/events').then(response => {
      this.eventsSubject.next(response.data);
    });
  }
  /**
 * Dodaje nowe wydarzenie do serwera i aktualizuje listę wydarzeń
 * @param event - Obiekt wydarzenia, który ma zostać dodany
 * @returns Observable<Event> - Observable zawierający dodane wydarzenie
 */
  addEvent(event: Event): Observable<Event> {
    return new Observable(observer => {
      axios.post<Event>('http://localhost:3000/api/events', event).then(response => {
        const newEvent = response.data;
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next([...currentEvents, newEvent]);
        observer.next(newEvent);
        observer.complete();
      });
    });
  }
  /**
  * Pobiera szczegóły wydarzenia na podstawie jego ID
  * @param id - ID wydarzenia
  * @returns Observable<Event> - Observable zawierający szczegóły wydarzenia
  */
  public getEventById(id: number): Observable<Event> {
    return new Observable(observer => {
      axios.get<Event>(`${this.eventsUrl}/${id}`).then(response => {
        observer.next(response.data);
        observer.complete();
      });
    });
  }
  /**
   * Pobiera wszystkie wydarzenia
   * @returns Observable<any[]> - Observable zawierający listę wszystkich wydarzeń
   */
  getAllEvents(): Observable<any[]> {
    return new Observable(observer => {
      axios.get<any[]>(`http://localhost:3000/api/events/`).then(response => {
        observer.next(response.data);
        observer.complete();
      });
    });
  }
  /**
   * Aktualizuje dane wydarzenia na serwerze
   * @param eventId - ID wydarzenia
   * @param eventData - Dane wydarzenia do zaktualizowania
   * @returns Observable<Event> - Observable zawierający zaktualizowane wydarzenie
   */
  updateEvent(eventId: number, eventData: any): Observable<Event> {
    return new Observable(observer => {
      axios.put<Event>(`http://localhost:3000/api/events/${eventId}`, eventData).then(response => {
        observer.next(response.data);
        observer.complete();
      });
    });
  }
  /**
   * Usuwa wydarzenie z serwera
   * @param id - ID wydarzenia do usunięcia
   * @returns Observable<Event> - Observable zawierający usunięte wydarzenie
   */
  deleteEvent(id: number): Observable<Event> {
    return new Observable(observer => {
      axios.delete<Event>(`http://localhost:3000/api/events/${id}`).then(response => {
        observer.next(response.data);
        observer.complete();
      });
    });
  }

  /**
   * Zapisuje użytkownika na wydarzenie i aktualizuje dostępność miejsc
   * @param userId - ID użytkownika
   * @param eventId - ID wydarzenia
   * @returns Observable<any> - Observable zawierający wynik zapisania na wydarzenie
   */
  joinEvent(userId: number, eventId: number): Observable<any> {
    return new Observable(observer => {
      axios.get<any>(`${this.apiUrl}/users/${userId}`).then(response => {
        const user = response.data;
        if (user.events.includes(eventId)) {
          alert('Już jesteś zapisany na to wydarzenie!');
          observer.complete();
          return;
        }
        user.events.push(eventId);
        axios.put(`${this.apiUrl}/users/${userId}`, user).then(() => {
          alert('Zapisano na wydarzenie!');
          axios.get<any>(`${this.apiUrl}/api/events/${eventId}`).then(eventResponse => {
            const event = eventResponse.data;
            if (event.seats > 0) {
              event.seats -= 1;
              axios.put(`${this.apiUrl}/api/events/${eventId}`, event).then(() => {
                observer.next(event);
                observer.complete();
              });
            } else {
              alert('Brak dostępnych miejsc!');
              observer.complete();
            }
          });
        });
      });
    });
  }
  /**
  * Usuwa użytkownika z wydarzenia i aktualizuje dostępność miejsc
  * @param userId - ID użytkownika
  * @param eventId - ID wydarzenia
  * @returns Observable<any> - Observable zawierający wynik usunięcia użytkownika z wydarzenia
  */
  removeEvent(userId: number, eventId: number): Observable<any> {
    return new Observable(observer => {
      axios.get<any>(`${this.apiUrl}/users/${userId}`).then(response => {
        const user = response.data;
        user.events = user.events.filter((id: number) => id !== eventId);
        axios.put(`${this.apiUrl}/users/${userId}`, user).then(() => {
          axios.get<any>(`${this.apiUrl}/api/events/${eventId}`).then(eventResponse => {
            const event = eventResponse.data;
            event.seats += 1;
            axios.put(`${this.apiUrl}/api/events/${eventId}`, event).then(() => {
              observer.next(event);
              observer.complete();
            });
          });
        });
      });
    });
  }
}
