import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Textarea from "../components/textarea"
import { auth } from "../firebase/firebase"
import { setDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { toast } from "react-toastify"



const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [value, setvalue] = useState("")

    // const { user } = "";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    // useEffect(() => {
    //     user && navigate('/dashboard');
    // }, [user]);

    const submitsignButton = async (data) => {
        try {
            const { email, password } = data;
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user, 'register');
            toast.success("sign up succuess",{position:"top-right"})

            navigate("/log-in")
        } catch (err) {
            console.log('Error:', err);
            toast.error(err.message,{position:"top-right"})
        }
    };


    function handlegooglesubmit() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in:", result.user);
                setvalue(result.user)
                navigate("/home")
                toast.success("google login success",{position:"top-right"})
            })
            .catch((error) => {
                console.error("Sign-in error:", error);
                toast.error(error.message ,{position:"top-right"})
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


            <div className="w-full h-screen flex items-center justify-center">
                <form className="w-full md:w-[450px] bg-white px-10 pt-14 pb-14 flex flex-col gap-3" >

                    <div>
                        <p className="text-black text-2xl font-bold text-center">Create an account!</p>
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

                   

                    <p className="w-full py-2  text-sm text-start text-[#999DA3]">By continuing, you agree to our <span className="text-[#FF698D]">terms of service.</span> </p>


                    <button className="w-full h-10 bg-[#FF698D] text-white rounded-md" onClick={handleSubmit(submitsignButton)}>Sign Up</button>


                    <p className=" text-sm text-[#999DA3] py-3">
                        or sign up with
                    </p>

                    <div class="px-6 sm:px-0 max-w-full ">


                        <button type="button"
                            onClick={handlegooglesubmit}
                            class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                    </div>

                    <p className=" text-[#999DA3]">
                        Already have an account? <Link to="/log-in"> <span className="text-[#FF698D]">log in here</span></Link>
                    </p>

                </form>
            </div>
        </>
    )
}

export default SignUp  