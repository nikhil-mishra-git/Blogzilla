import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
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
                        Home
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
                            Profile
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className={navLinkClass}>
                                Sign In
                            </NavLink>
                            <NavLink to="/signup" className={navLinkClass}>
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
