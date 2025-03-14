import React from 'react';

const DashForm = () => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg max-w-full rounded-2xl'>
      <table className='text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full'>
        <caption className='p-5 text-lg font-semibold text-left  text-gray-900 bg-white dark:text-white dark:bg-gray-800'>Our products</caption>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full'>
          <tr>
            <th scope='col' className='px-6 py-5'>
              Product name
            </th>
            <th scope='col' className='px-6 py-5'>
              Color
            </th>
            <th scope='col' className='px-6 py-5'>
              Category
            </th>
            <th scope='col' className='px-6 py-5'>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              Apple MacBook Pro
            </th>
            <td className='px-6 py-4'>Silver</td>
            <td className='px-6 py-4'>Laptop</td>
            <td className='px-6 py-4'>$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashForm;
