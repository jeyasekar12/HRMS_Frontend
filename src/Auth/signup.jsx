import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Textarea from '../components/textarea';
import { auth } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [value, setvalue] = useState('');

  const { user } = '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/dashboard');
  }, [user]);

  const submitsignButton = async (data) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user, 'register');
      toast.success('sign up succuess', { position: 'top-right' });

      navigate('/log-in');
    } catch (err) {
      console.log('Error:', err);
      toast.error(err.message, { position: 'top-right' });
    }
  };

  function handlegooglesubmit() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        setvalue(result.user);
        navigate('/home');
        toast.success('google login success', { position: 'top-right' });
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        toast.error(error.message, { position: 'top-right' });
      });
  }

  // onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //         console.log("User is signed in:", user.email);
  //     } else {
  //         console.log("User is signed out or closed the popup.");
  //     }
  // });

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <form className='w-full md:w-[450px] bg-white px-10 pt-14 pb-14 flex flex-col gap-3'>
          <div>
            <p className='text-black text-2xl font-bold text-center'>Create an account!</p>
          </div>

          <Textarea
            placeholder='name'
            type='text'
            name='name'
            label='Name'
            className='w-full rounded'
            register={register('name', {
              required: 'name is reqire',
            })}
            errors={errors.name ? errors.name.message : ''}
          />

          <Textarea
            placeholder='email'
            type='text'
            name='email'
            label='Email'
            className='w-full rounded'
            register={register('email', {
              required: 'email is reqire',
            })}
            errors={errors.email ? errors.email.message : ''}
          />

          <Textarea
            placeholder='password'
            type='password'
            name='password'
            label='Password'
            className='w-full rounded'
            register={register('password', {
              required: 'password is reqire',
            })}
            errors={errors.password ? errors.password.message : ''}
          />

          <p className='w-full py-2  text-sm text-start text-[#999DA3]'>
            By continuing, you agree to our <span className='text-[#FF698D]'>terms of service.</span>{' '}
          </p>

          <button className='w-full h-10 bg-[#FF698D] text-white rounded-md' onClick={handleSubmit(submitsignButton)}>
            Sign Up
          </button>

          <p className=' text-sm text-[#999DA3] py-3 text-center'>or sign up with</p>

          <div className='flex items-center justify-center  dark:bg-gray-800'>
            <button
              onClick={handlegooglesubmit}
              className='w-full px-4 py-2 border flex items-center justify-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-[#E4E7EB]'
            >
              <img className='w-6 h-6' src='https://www.svgrepo.com/show/475656/google-color.svg' loading='lazy' alt='google logo' />
              <span>Login with Google</span>
            </button>
          </div>

          <p className=' text-[#999DA3] text-center'>
            Already have an account?{' '}
            <Link to='/log-in'>
              {' '}
              <span className='text-[#FF698D]'>log in here</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
