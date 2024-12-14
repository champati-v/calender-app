import React from 'react';
import clsx from 'clsx';
import { CalendarEvent } from '../types';

interface EventListProps {
  events: CalendarEvent[];
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  isPastDate: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEditEvent,
  onDeleteEvent,
  isPastDate,
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg">
        No events for this date
      </div>
    );
  }

  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className={clsx(
            "flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-colors",
            !isPastDate && "hover:bg-gray-100"
          )}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: event.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {event.title}
                </h4>
                {event.time && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {event.time}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="text-sm text-gray-500 mt-1">{event.description}</p>
              )}
            </div>
          </div>
          {!isPastDate && (
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEditEvent(event)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                ✎
              </button>
              <button
                onClick={() => onDeleteEvent(event.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};