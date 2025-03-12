import React from 'react';
import Textarea from '../components/textarea';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';

function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Forgot Password Email:', data.forgetpass);

    const email = data.forgetpass; // Use the correct field name

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Check your email.');
        navigate('/log-in');
      })
      .catch((err) => {
        toast.error(`Error: ${err.code}`);
      });
  };

  return (
    <>
      <div className='w-full min-h-screen flex items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[450px] bg-white px-10 pt-14 pb-14 flex flex-col gap-5'>
          <div>
            <p className='text-black text-2xl font-bold text-center'>Forgot Password?</p>
            <p className='text-1xl text-[#666666] mt-3 mb-3 text-center'>
              Enter your email address to get the
              <br /> password reset link.
            </p>
          </div>

          <Textarea
            placeholder='Enter Your Email '
            type='text'
            name='forgetpass'
            label='Email Address'
            className='w-full rounded'
            register={register('forgetpass', {
              required: 'Email is reqire',
            })}
            errors={errors.forgetpass ? errors.forgetpass.message : ''}
          />

          <button type='submit' className='w-full h-10 bg-[#FF698D] text-white rounded-md'>
            Password Reset
          </button>

          <p className=' text-[#999DA3] text-center'>
            <Link to='/log-in'>
              {' '}
              <span className='text-[#FF698D]'>Back to Login</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default ForgetPass;
