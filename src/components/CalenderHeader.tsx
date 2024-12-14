import React from 'react';
import { formatDate } from '../utils/DateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {formatDate(currentDate, 'MMMM yyyy')}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ←
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  );
};