import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Input } from './index';
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../features/authSlice';
import authService from "../services/authService";
import { useDispatch } from "react-redux";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLoginSubmit = async (data) => {
        setError('');
        setLoading(true);
        try {
            const userSession = await authService.loginUser(data);
            if (userSession) {
                const currUserData = await authService.getUser();
                if (currUserData) {
                    dispatch(authLogin({ userData: currUserData }));
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error while GetUser Data :: ", error);
            throw error.message;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Login to Blogzilla
                </h2>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm text-center mb-2">{error}</p>
                )}

                <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
                    <Input
                        icon={FaEnvelope}
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address"
                            }
                        })}
                    />

                    <Input
                        icon={FaLock}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: true,
                            message: "Invalid Password"
                        })}
                        rightIcon={showPassword ? FaEye : FaEyeSlash}
                        onRightIconClick={() => setShowPassword(!showPassword)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="my-4 text-sm text-center text-gray-400">OR</p>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Login with Google</span>
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-black font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;