import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  seats: number;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
};

// Tworzenie slice z akcjami (dodawanie akcji)
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    setCurrentEvent: (state, action: PayloadAction<Event | null>) => {
      state.currentEvent = action.payload;
    },
  },
});

export const { addEvent, setCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;
