export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  color?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  time?: string;
  color: string;
}