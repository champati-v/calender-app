import React from 'react';
import clsx from 'clsx';
import { formatDate, isCurrentMonth, isCurrentDay } from '../utils/DateUtils';
import { CalendarEvent } from '../types';
import { getEventsForDate } from '../utils/EventUtils';

interface CalendarDayProps {
  date: Date;
  baseDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  baseDate,
  events,
  onSelectDate,
}) => {
  const isThisMonth = isCurrentMonth(date, baseDate);
  const isToday = isCurrentDay(date);
  const dayEvents = getEventsForDate(events, date);

  return (
    <button
      onClick={() => onSelectDate(date)}
      className={clsx(
        'w-full aspect-square flex flex-col items-stretch p-1 rounded-lg',
        'hover:bg-gray-100 transition-colors relative group',
        {
          'text-gray-400': !isThisMonth,
          'text-gray-900': isThisMonth,
          'bg-blue-50': isToday,
        }
      )}
    >
      <span
        className={clsx('text-sm self-center mb-1', {
          'font-semibold': isToday,
        })}
      >
        {formatDate(date, 'd')}
      </span>
      {dayEvents.length > 0 && (
        <div className="flex flex-wrap gap-1 overflow-hidden">
          {dayEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="w-full h-2 rounded-full"
              style={{ backgroundColor: event.color }}
            />
          ))}
          {dayEvents.length > 2 && (
            <span className="text-xs text-gray-500">
              +{dayEvents.length - 2}
            </span>
          )}
        </div>
      )}
    </button>
  );
};