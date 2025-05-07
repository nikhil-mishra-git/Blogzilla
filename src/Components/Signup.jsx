import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <FaUser className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-10 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="absolute top-3.5 right-4 text-gray-500"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className="my-4 text-center text-gray-500">OR</div>

                {/* Google Button */}
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                {/* Login Redirect */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-black font-medium hover:underline">
                        Sign In
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Signup;
