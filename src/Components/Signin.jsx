import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../Store/authSlice';
import { Input } from './index'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/authService';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, seterror] = useState("")

    const handleLogin = async (data) => {
        console.log(data);
        
        seterror("")
        try {
            const session = await authService.loginAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) { dispatch(authLogin(userData)) }
                navigate("/")
            }
        } catch (error) {
            seterror(error.message);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login to Blogzilla</h2>
                {error && <p className="text-red-600 my-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    <Input
                        icon={FaUser}
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email adress not valid"
                            }
                        })}
                    />
                    <Input
                        icon={FaLock}
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="my-4 text-center text-gray-500">OR</div>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to='/signup'>
                        <span className="text-black font-medium cursor-pointer hover:underline">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Signin;
