import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPen, FaHome, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/Blogzilla Logo.png';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `px-5 py-3 rounded-full transition ${isActive
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        }`;

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm py-3">
            <div className="max-w-[1350px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 h-auto md:h-20">
                {/* Logo + Search */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <NavLink to="/">
                        <img
                            src={logo}
                            alt="Blogzilla Logo"
                            className="h-32 w-auto object-contain"
                        />
                    </NavLink>
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-grow md:flex-grow-0 bg-gray-200/80 text-sm px-6 py-3 rounded-full focus:outline-none"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium w-full md:w-auto">
                    <NavLink to="/" className={navLinkClass}>
                        <div className="flex items-center gap-2">
                            <FaHome size={14} />
                            Home
                        </div>
                    </NavLink>

                    {isLoggedIn && (
                        <NavLink
                            to="/write"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-full transition ${isActive
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`
                            }
                        >
                            <FaPen size={14} />
                            <span>Write</span>
                        </NavLink>
                    )}

                    {isLoggedIn ? (
                        <NavLink to="/profile" className={navLinkClass}>
                            <div className="flex items-center gap-2">
                                <FaUser size={14} />
                                Profile
                            </div>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className={navLinkClass}>
                                <div className="flex items-center gap-2">
                                    <FaSignInAlt size={14} />
                                    Sign In
                                </div>
                            </NavLink>
                            <NavLink to="/signup" className={navLinkClass}>
                                <div className="flex items-center gap-2">
                                    <FaUserPlus size={14} />
                                    Sign Up
                                </div>
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
