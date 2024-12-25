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

  async fetchEvents(): Promise<void> {
    const response = await fetch(this.eventsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    const events = await response.json();
    this.eventsSubject.next(events);
  }

 
}
