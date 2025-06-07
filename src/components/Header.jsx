import React from 'react'
import { Container, Logo } from './index'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome, FaPen, FaSearch, FaSignInAlt, FaUser, FaUserPlus } from 'react-icons/fa'

const Header = () => {

    const authStatus = useSelector((state) => state.auth.isLoggedin)
    // const authStatus = true
    const navigate = useNavigate()

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
            show: authStatus
        },
        {
            to: '/profile',
            icon: <FaUser size={14} />,
            label: 'Profile',
            show: authStatus
        },
        {
            to: '/login',
            icon: <FaSignInAlt size={14} />,
            label: 'Sign In',
            show: !authStatus
        },
        {
            to: '/register',
            icon: <FaUserPlus size={14} />,
            label: 'Sign Up',
            show: !authStatus
        }
    ]

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm py-3">
            <Container>
                <nav className="px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:h-20">

                    {/* Left: Logo + Search */}
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">

                        <Logo height={32} />

                        <div className="relative w-full md:w-[250px]">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-100 text-sm px-10 py-3 rounded-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right: Navigation Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium w-full md:w-auto">
                        {navLinks.map(({ to, label, icon, show }) => (
                            show && (
                                <NavLink
                                    key={label}
                                    to={to}
                                    className={navLinkClass}
                                >
                                    <div className="flex items-center gap-2">
                                        {icon}
                                        {label}
                                    </div>
                                </NavLink>
                            )
                        ))}
                    </div>

                </nav>
            </Container>
        </header>
    )
}

export default Header

