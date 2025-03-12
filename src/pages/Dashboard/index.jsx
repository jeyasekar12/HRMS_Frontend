import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';
import DashForm from './DashForm';
import { PieChart } from './PieChart';
import ApexChart from './FLowChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import '../../App.css';

const Dashboard = () => {
  // Correct useState initialization
  const [value, setValue] = useState(new Date());

  return (
    <>
      <div className='grid grid-cols-3 w-full gap-5 bg-[#fff] p-4 2xl:px-10'>
        <div className='flex flex-col gap-4 col-span-2'>
          <AttendanceCard />
          <DashForm />
        </div>
        <div className='bg-white p-4 shadow-lg rounded-lg'>
          <Calendar onChange={setValue} value={value} />
        </div>
      </div>

      <div className='flex gap-5 mt-5'>
        <div className='h-full w-full shadow-lg rounded-lg bg-white p-4'>
          <PieChart data={[]} />
        </div>
        <div className='p-2 shadow-lg rounded-lg bg-white'>
          <ApexChart data={[]} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
