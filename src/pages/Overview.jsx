import React from 'react';
import Calendar from '../components/Calender';
import AttendanceCard from '../components/AttendanceCard';
import DashForm from '../components/DashForm';
import { PieChart } from '../components/PieChart';
import ApexChart from '../components/FLowChart';

const Overview = () => {
  return (
    <>
      <div className='grid grid-cols-3 w-full gap-5 bg-[#fff] p-4 2xl:px-10'>
        <div className='flex flex-col gap-4 col-span-2'>
          <AttendanceCard />
          <DashForm />
        </div>
        <div>
          <Calendar />
        </div>
      </div>
      <div className='flex'>
        <div className='w-full h-full shadow-lg rounded-lg bg-white'>
          <PieChart /> {/* Correct usage */}
        </div>
        <div className=' bg-[#fff] p-2 shadow-lg rounded-lg'>
          <ApexChart />
        </div>
      </div>

      <div className='flex'>
        <div className='w-full h-full shadow-lg rounded-lg bg-white'>
          <PieChart /> {/* Correct usage */}
        </div>
        <div className=' bg-[#fff] p-2 shadow-lg rounded-lg'>
          <ApexChart />
        </div>
      </div>
    </>
  );
};

export default Overview;
