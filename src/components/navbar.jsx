import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authslice';
import { MdNotificationAdd, MdNotificationImportant, MdNotificationsActive, MdOutlineSearch } from 'react-icons/md';
import UserAvatar from './useravatar';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  return (
    <div className='flex justify-end gap-5 items-center bg-[#EEEEEE] px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => {
            return dispatch(setOpenSidebar(true));
          }}
          className='text-2xl text-gray-500 block md:hidden'
        >
          <GiHamburgerMenu />
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#ffffff]'>
          <MdOutlineSearch className='text-gray-500 text-xl' />

          <input type='text' placeholder='Search.....' className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800' />
        </div>
      </div>

      <div>
        <MdNotificationsActive className='text-gray-500 text-2xl' />
      </div>

      <div className='flex gap-2 items-center mt-1'>
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
