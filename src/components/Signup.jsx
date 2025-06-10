import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Input } from './index';
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../features/authSlice';
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePasswordToggle = () => setShowPassword(!showPassword);

    const onSignupSubmit = async (data) => {
        setError("");
        setLoading(true);
        try {
            if (!data.email || !data.password || !data.name) {
                throw new Error("All fields are required");
            }
            const userData = await authService.createUser(data);
            if (userData) {
                const currUserData = await authService.getUser();
                if (currUserData) dispatch(authLogin(currUserData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-start justify-center px-4">
            <div className="bg-white shadow-xl rounded-xl my-16 p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>
                {error && <p className="text-red-600 my-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSignupSubmit)} className="space-y-5">
                    <Input
                        icon={FaUser}
                        name="name"
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
                        autoComplete="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) =>
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address"
                            }
                        })}
                    />
                    <Input
                        icon={FaLock}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        rightIcon={showPassword ? FaEye : FaEyeSlash}
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
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
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
