import React, { useState } from 'react';

const Calendar = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentMonth, setCurrentMonth] = useState(8); // September (0-based index)
  const [currentYear, setCurrentYear] = useState(2022);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    let dates = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        dates.push(week);
        week = [];
      }
    }
    if (week.length) {
      dates.push(week);
    }
    return dates;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const govtHolidays = [1, 15, 25]; // Example holidays
  const leaveDays = [10, 19]; // Example leave days
  const dates = generateCalendar();

  return (
    <div className='max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg'>
      <h2 className='text-lg font-semibold text-gray-700 text-center mb-2'>Personal Calendar</h2>
      <div className='flex justify-between items-center mb-4'>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span className='text-gray-800 font-semibold'>
          {months[currentMonth]} {currentYear}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className='grid grid-cols-7 text-center text-gray-500 font-medium'>
        {days.map((day) => (
          <div key={day} className='py-1'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 text-center'>
        {dates.flat().map((date, index) => (
          <div
            key={index}
            className={`py-2 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center mx-auto text-sm
              ${date && govtHolidays.includes(date) ? 'text-red-500' : ''}
              ${date && leaveDays.includes(date) ? 'bg-blue-500 text-white' : ''}
              ${date === null ? 'invisible' : ''}`}
          >
            {date}
          </div>
        ))}
      </div>
      <div className='mt-4 flex justify-between text-sm text-gray-600'>
        <div className='flex items-center'>
          <span className='w-3 h-3 bg-red-500 inline-block mr-2'></span>
          Govt Holiday
        </div>
        <div className='flex items-center'>
          <span className='w-3 h-3 bg-blue-500 inline-block mr-2'></span>
          Leave
        </div>
      </div>
    </div>
  );
};

export default Calendar;
