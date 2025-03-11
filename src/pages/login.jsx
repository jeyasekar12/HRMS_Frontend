import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Textarea from '../components/textarea';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authslice';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux Dispatch
  const [isChecked, setIsChecked] = useState(false);

  const submitButton = async (data) => {
    if (!isChecked) {
      toast.error('You must agree to keep signed in', { position: 'top-right' });
      return;
    }

    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save to Redux Store
      dispatch(
        setCredentials({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      toast.success('Login Successful', { position: 'top-right' });

      // Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.log('Error:', err);
      toast.error(err.message, { position: 'top-right' });
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <form className='w-full md:w-[450px] bg-white px-10 pt-14 pb-14 flex flex-col gap-3'>
        <p className='text-black text-2xl font-bold text-center'>Sign In!</p>

        <Textarea
          placeholder='Email'
          type='text'
          name='email'
          label='Email'
          className='w-full rounded'
          register={register('email', { required: 'Email is required' })}
          errors={errors.email ? errors.email.message : ''}
        />

        <Textarea
          placeholder='Password'
          type='password'
          name='log_password'
          label='Password'
          className='w-full rounded'
          register={register('password', { required: 'Password is required' })}
          errors={errors.password ? errors.password.message : ''}
        />

        <div className='flex gap-3'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={(e) => {
              return setIsChecked(e.target.checked);
            }}
          />
          <p className='text-1xl text-[#191D23]'>Keep me signed in</p>
        </div>

        <button className='w-full h-10 bg-[#FF698D] text-white rounded-md' onClick={handleSubmit(submitButton)}>
          Log In
        </button>

        <p className='text-sm text-[#999DA3] py-3 text-center'>or sign in with</p>

        <button type='button' className='w-full bg-[#4285F4] text-white rounded-lg px-5 py-2.5'>
          Sign in with Google
        </button>

        <p className='text-[#999DA3] text-center'>
          <Link to='/sign-up'>
            <span className='text-[#FF698D]'>Register here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
