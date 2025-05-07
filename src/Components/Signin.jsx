import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Logging in with:', email, password);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login to Blogzilla</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div className="relative">
                        <FaUser className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute top-3.5 left-4 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <div className="my-4 text-center text-gray-500">OR</div>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                {/* Sign Up Redirect */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <span className="text-black font-medium cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Signin;
