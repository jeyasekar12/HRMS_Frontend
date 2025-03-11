import React from 'react';
import { CloudSun } from 'lucide-react'; // For weather icon

const AttendanceCard = () => {
  return (
    <div className='flex items-center justify-between bg-gradient-to-r from-green-300 to-green-900 text-white p-4 rounded-2xl w-full max-w-full shadow-md'>
      {/* Left Side - Weather & Date */}
      <div className='flex items-center gap-3'>
        <CloudSun className='w-10 h-10' />
        <div>
          <p className='text-sm'>21 September 2022</p>
          <p className='text-lg font-bold'>Today</p>
        </div>
      </div>

      {/* Right Side - Attendance Summary */}
      <div className='flex gap-6 text-right'>
        <div>
          <p className='text-sm'>Present-on time</p>
          <p className='text-xl font-bold'>70</p>
        </div>
        <div>
          <p className='text-sm'>Late</p>
          <p className='text-xl font-bold'>20</p>
        </div>
        <div>
          <p className='text-sm'>Absent</p>
          <p className='text-xl font-bold'>7</p>
        </div>
        <div>
          <p className='text-sm'>Leave</p>
          <p className='text-xl font-bold'>3</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
