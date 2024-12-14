import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay
} from 'date-fns';

export const generateCalendarDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const formatDate = (date: Date, formatString: string) => {
  return format(date, formatString);
};

export const isCurrentMonth = (date: Date, baseDate: Date) => {
  return isSameMonth(date, baseDate);
};

export const isCurrentDay = (date: Date) => {
  return isToday(date);
};

export const isPastDate = (date: Date) => {
  const today = startOfDay(new Date());
  return isBefore(date, today);
};