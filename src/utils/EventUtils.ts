import { CalendarEvent } from '../types';

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );
};

export const generateEventId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};