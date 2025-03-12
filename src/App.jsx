import React from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';

// Pages

// Components

import { IoClose } from 'react-icons/io5';
import { setOpenSidebar } from './redux/slices/authslice';

import Dashboard from './pages/Dashboard';
import Sidebar from './Layout/sidebar';
import SignUp from './Auth/signup';
import Login from './Auth/login';
import Navbar from './Layout/navbar';
import ForgetPass from './Auth/forgetPass';
import EmployeManagement from './pages/EmployeManagement';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import { Settings } from 'lucide-react';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';

/**
 * Layout Component - Handles Authenticated Users' Dashboard Layout
 */
function Layout() {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      {/* Sidebar for Desktop */}
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      {/* Sidebar for Mobile */}
      <MobileSidebar />

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

/**
 * Mobile Sidebar Component
 */
const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => {
    return state.auth;
  });
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter='transition-opacity duration-700'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-700'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div
        ref={mobileMenuRef}
        className={clsx(
          'fixed inset-0 md:hidden bg-black/40 transition-all duration-700 transform',
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onClick={closeSidebar}
      >
        <div className='bg-white w-3/4 h-full shadow-lg'>
          <div className='w-full flex justify-end px-5'>
            <button onClick={closeSidebar} className='mt-5'>
              <IoClose size={25} />
            </button>
          </div>
          <div className='mt-5'>
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

/**
 * Private Route Wrapper - Protects Routes that Require Authentication
 */
const PrivateRoute = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  return user ? <Outlet /> : <Navigate to='/log-in' />;
};

/**
 * Main Application Component
 */
function App() {
  return (
    // <Router>
    <main className='w-full min-h-screen bg-white'>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path='/log-in' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forget-password' element={<ForgetPass />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index path='/' element={<Navigate to='/dashboard' />} />
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/employe-management' element={<EmployeManagement />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/leave' element={<Leave />} />
            <Route path='/payroll' element={<Payroll />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/reports' element={<Reports />} />
          </Route>
        </Route>

        {/* Catch-all for Undefined Routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </main>
    // </Router>
  );
}

export default App;
