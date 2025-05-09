import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaPen, FaHome, FaUser, FaSignInAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
import logo from '../assets/Blogzilla Logo.png';
import { useSelector } from 'react-redux';

const Header = () => {
    const isLoggedin = useSelector(state => state.auth.isLoggedin);
    const navigate = useNavigate();

    const navLinkClass = ({ isActive }) =>
        `px-5 py-3 rounded-full transition ${isActive
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        }`;

    const navLinks = [
        {
            to: '/',
            icon: <FaHome size={14} />,
            label: 'Home',
            show: true
        },
        {
            to: '/write',
            icon: <FaPen size={14} />,
            label: 'Write',
            show: isLoggedin
        },
        {
            to: '/profile',
            icon: <FaUser size={14} />,
            label: 'Profile',
            show: isLoggedin
        },
        {
            to: '/login',
            icon: <FaSignInAlt size={14} />,
            label: 'Sign In',
            show: !isLoggedin
        },
        {
            to: '/signup',
            icon: <FaUserPlus size={14} />,
            label: 'Sign Up',
            show: !isLoggedin
        }
    ];

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm py-3">
            <div className="max-w-[1350px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 h-auto md:h-20">

                {/* Logo + Search */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Blogzilla Logo"
                            className="h-32 w-auto object-contain"
                        />
                    </Link>
                    <div className="relative w-full md:w-auto">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-200/80 text-sm px-10 py-3 rounded-full focus:outline-none"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium w-full md:w-auto">
                    {navLinks.map((link, index) =>
                        link.show ? (
                            <NavLink
                                key={index}
                                to={link.to}
                                className={navLinkClass}
                            >
                                <div className="flex items-center gap-2">
                                    {link.icon}
                                    {link.label}
                                </div>
                            </NavLink>
                        ) : null
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
