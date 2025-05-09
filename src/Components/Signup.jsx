import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin, login } from '../Store/authSlice';
import { Input } from './index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/authService';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm();
    const [error, seterror] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSignup = async (data) => {
        console.log(data);
        seterror("");

        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                }
                navigate("/");
            }
        } catch (error) {
            seterror(error.message);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>
                {error && <p className="text-red-600 my-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
                    <Input
                        icon={FaUser}
                        name="fullName"
                        placeholder="Full Name"
                        {...register("name", {
                            required: "Name is required"
                        })}
                    />
                    <Input
                        icon={FaEnvelope}
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email address not valid"
                            }
                        })}
                    />
                    <Input
                        icon={FaLock}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        rightIcon={showPassword ? FiEye : FiEyeOff}
                        onRightIconClick={handlePasswordToggle}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="my-4 text-center text-gray-500">OR</div>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Signup;
