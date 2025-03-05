import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Textarea from "../components/textarea"
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";





const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');



    const submitButton = async (data) => {
        if (!isChecked) {
            toast.error('You must agree to keep signed in',{position:"top-right"});
            return;
        }
        setCheckboxError('');
        
        try {
            const { email, password } = data;
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user, 'register');
            toast.success("Success", { position: "top-right" });
            navigate("/home");
        } catch (err) {
            console.log('Error:', err);
            toast.error(err.message, { position: "top-right" });
        }
    };



    return (
        <>


            <div className="w-full min-h-screen flex items-center justify-center">
                <form className="w-full md:w-[450px] bg-white px-10 pt-14 pb-14 flex flex-col gap-3" >

                <div>
                        <p className="text-black text-2xl font-bold text-center">Sign In!</p>
                    </div>

                    <Textarea
                        placeholder='Email'
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
                        placeholder='Password'
                        type='password'
                        name='log_password'
                        label='Password'
                        className='w-full rounded'
                        register={register('password', {
                            required: 'password is reqire',
                        })}
                        errors={errors.password ? errors.password.message : ''}
                    />




                    <div className="flex gap-3">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <p className="text-1xl text-[#191D23]">Keep me signed in</p>
                    </div>
                    {checkboxError && <p className="text-red-500">{checkboxError}</p>}



                    <button className="w-full h-10 bg-[#FF698D] text-white rounded-md" onClick={handleSubmit(submitButton)}>Log In</button>


                    <p className=" text-sm text-[#999DA3] py-3">
                        or sign in with
                    </p>

                    <div class="px-6 sm:px-0 max-w-sm ">
                        <button type="button" class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                    </div>

                    <p className=" text-[#999DA3]">
                        <Link to="/sign-up"> <span className="text-[#FF698D]">Register here</span></Link>
                    </p>


                </form>
            </div>
        </>
    )
}

export default Login 