import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Input } from './index';
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../features/authSlice';
import authService from "../services/authService";
import { useDispatch } from "react-redux";
import Notification from '../components/Notification';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check if Appwrite session exists 
    useEffect(() => {
        const checkOAuthLogin = async () => {
            try {
                const userData = await authService.getUser();
                if (userData) {
                    dispatch(authLogin({ userData: userData }));
                    navigate("/");
                }
            } catch (error) {
                console.log("No active session or not logged in");
            }
        };
        checkOAuthLogin();
    }, []);

    // Email-Password login
    const onLoginSubmit = async (data) => {
        setLoading(true);
        try {
            const userSession = await authService.loginUser(data);
            if (userSession) {
                const currUserData = await authService.getUser();
                if (currUserData) {
                    dispatch(authLogin({ userData: currUserData }));
                    Notification.success("Logged in successfully!");
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error while GetUser Data :: ", error);
            Notification.error(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Validation error
    const onError = (errors) => {
        if (errors.email) {
            Notification.error(errors.email.message || "Email is required");
        }
        if (errors.password) {
            Notification.error(errors.password.message || "Password is required");
        }
    };

    // Google OAuth login 
    const handleGoogleLogin = async () => {
        try {
            const userData = await authService.loginWithGoogle();
            if (userData) {
                dispatch(authLogin({ userData: userData }));
                Notification.success("Logged in successfully!");
                navigate('/');
            }
        } catch (error) {
            Notification.error("Google login failed");
            console.error("Google OAuth error:", error);
        }
    }

    return (
        <div className="flex items-center justify-center px-4 min-h-[70vh]">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Login to Blogzilla
                </h2>

                <form onSubmit={handleSubmit(onLoginSubmit, onError)} className="space-y-4">
                    <Input
                        icon={FaEnvelope}
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            }
                        })}
                    />

                    <Input
                        icon={FaLock}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
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

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Login with Google</span>
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-black font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
