import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const WeekdayHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 gap-1 border-b border-gray-200">
      {WEEKDAYS.map((day) => (
        <div
          key={day}
          className="py-2 text-sm font-semibold text-gray-600 text-center"
        >
          {day}
        </div>
      ))}
    </div>
  );
};