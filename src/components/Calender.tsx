import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { generateCalendarDays, isPastDate } from '../utils/DateUtils';
import { generateEventId } from '../utils/EventUtils';
import { CalendarHeader } from './CalenderHeader';
import { WeekdayHeader } from './WeekdayHeader';
import { CalendarDay } from './CalenderDay';
import { EventList } from './EventList';
import { EventModal } from './EventModal';
import { CalendarEvent, EventFormData } from '../types';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handlePrevMonth = () => {
    setCurrentDate((date) => subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((date) => addMonths(date, 1));
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const handleEventSubmit = (formData: EventFormData) => {
    if (editingEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEvent.id
            ? { ...event, ...formData }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: generateEventId(),
        date: selectedDate!,
        ...formData,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsModalOpen(false);
  };

  const calendarDays = generateCalendarDays(currentDate);
  const selectedDateEvents = selectedDate
    ? events.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      <div> 
        <h1 className='text-white font-semibold text-3xl underline'>Calender Application</h1>
        <p className='mt-8 text-white text-2xl'>Features</p>
        <ul className='text-white mt-4 list-disc'>
          <li>Display grid for the current month.</li>
          <li>Allows to switch between months.</li>
          <li>Add Update and delete events along with time.</li>
          <li>Display event in a separate panel</li> 
          <li>Clean and modern UI.</li>
        </ul>
      </div>
      {/* Calendar Section */}
      <div className="flex-1 bg-white rounded-xl shadow-lg">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <div className="p-4">
          <WeekdayHeader />
          <div className="grid grid-cols-7 gap-1 mt-2">
            {calendarDays.map((day) => (
              <CalendarDay
                key={day.toISOString()}
                date={day}
                baseDate={currentDate}
                events={events}
                onSelectDate={setSelectedDate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Events Panel */}
      <div className="w-96 bg-white rounded-xl shadow-lg h-fit">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedDate ? (
                <>Events for {selectedDate.toLocaleDateString()}</>
              ) : (
                'Select a date to manage events'
              )}
            </h3>
          </div>
          {selectedDate && (
            <>
              <button
                onClick={handleAddEvent}
                className="w-full mb-6 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Event
              </button>
              <EventList
                events={selectedDateEvents}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                isPastDate={isPastDate(selectedDate!)}
              />
            </>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
        initialData={
          editingEvent
            ? {
                title: editingEvent.title,
                description: editingEvent.description || '',
                color: editingEvent.color || '#3B82F6',
              }
            : undefined
        }
        title={editingEvent ? 'Edit Event' : 'Add Event'}
      />
    </div>
  );
};