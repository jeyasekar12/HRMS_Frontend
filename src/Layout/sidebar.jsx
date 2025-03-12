import React from 'react';
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { MdDashboard, MdOutlineAccessAlarms, MdOutlinePayment, MdOutlinePendingActions, MdSettings, MdTaskAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authslice';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';
import { PiUserCircleGear } from 'react-icons/pi';
import { IoIosLeaf } from 'react-icons/io';
import { CiReceipt, CiSettings } from 'react-icons/ci';

const linkData = [
  {
    label: 'Dashboard',
    link: 'dashboard',
    icon: <MdDashboard />,
  },
  {
    label: 'Employe Management',
    link: 'employe-management',
    icon: <PiUserCircleGear />,
  },
  {
    label: 'Attendance',
    link: 'Attendance',
    icon: <MdOutlineAccessAlarms />,
  },
  {
    label: 'Leave',
    link: 'leave',
    icon: <IoIosLeaf />,
  },
  {
    label: 'Payroll',
    link: 'payroll',
    icon: <MdOutlinePayment />,
  },
  {
    label: 'Settings',
    link: 'settings',
    icon: <CiSettings />,
  },
  {
    label: 'Report',
    link: 'Report',
    icon: <CiReceipt />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split('/')[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          'w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded items-center text-white text-base hover:border-e-gray-900',
          path === el.link.split('/')[0] ? 'bg-[#FF698D] text-white' : ''
        )}
      >
        {el.icon}
        <span className='hover:text-[#fff]'>{el.label}</span>
      </Link>
    );
  };

  NavLink.propTypes = {
    el: PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    closeSidebar: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
  };

  async function handlelogout() {
    try {
      await auth.signOut();
      navigate('/log-in');
      toast.success('logout sucess');
    } catch (error) {
      console.log('errr');
      toast.error(error.message);
    }
  }

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5 bg-black'>
      {/* <p className='bg-orange-400 p-2 rounded-full '> */}
      <div className='px-5 py-5'>
        <img src={logo} alt='Taskk Logo' className='w-50' />
      </div>

      {/* <MdOutlineAddTask className="text-white text-2xl font-black" />  */}
      {/* </p> */}

      <div className='flex flex-col flex-1 gap-y-5 py-8'>
        {sidebarLinks.map((link) => {
          return <NavLink el={link} key={link.label} />;
        })}
      </div>

      <div>
        <button
          className='w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded  items-center text-lg text-white dark:text-white bg-[#FF698D] mb-3'
          onClick={handlelogout}
        >
          <MdSettings />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
