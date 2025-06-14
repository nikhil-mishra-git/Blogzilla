import React, { useState } from 'react'
import { Container, Logo } from './index'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaHome, FaPen, FaSearch, FaSignInAlt, FaUser, FaUserPlus, FaTimes, FaBars} from 'react-icons/fa'
import { setSearchQuery, clearSearchQuery } from '../features/searchSlice'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.isLoggedin)
    const searchQuery = useSelector((state) => state.search.query)

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const handleClearSearch = () => {
        dispatch(clearSearchQuery())
    }

    const navLinkClass = ({ isActive }) =>
        `px-5 py-3 rounded-full transition duration-200 text-left w-full md:w-auto ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
        }`

    const navLinks = [
        { to: '/', icon: <FaHome size={14} />, label: 'Home', show: true },
        { to: '/writeblog', icon: <FaPen size={14} />, label: 'Write', show: authStatus },
        { to: '/profile', icon: <FaUser size={14} />, label: 'Profile', show: authStatus },
        { to: '/login', icon: <FaSignInAlt size={14} />, label: 'Sign In', show: !authStatus },
        { to: '/signup', icon: <FaUserPlus size={14} />, label: 'Sign Up', show: !authStatus }
    ]

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm py-3">
            <Container>
                <nav className="flex flex-col py-3 md:flex-row items-center justify-between px-4 gap-4 md:h-20">
                    {/* Logo + Desktop Search + Hamburger */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <Logo />
                            <div className="relative hidden md:block w-[250px]">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search blog..."
                                    className="w-full bg-gray-200/80 text-sm px-10 py-3 rounded-full focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Hamburger Icon */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <div className="block md:hidden w-full">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search blog..."
                                className="w-full bg-gray-200/80 text-sm px-10 py-3 rounded-full focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition"
                                >
                                    <FaTimes size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div
                        className={`flex-col md:flex md:flex-row items-start md:items-center mt-3 md:mt-0 gap-4 md:gap-6 text-sm font-medium w-full md:w-auto transition-all duration-300 ${menuOpen ? 'flex' : 'hidden md:flex'
                            }`}
                    >
                        {navLinks.map(({ to, label, icon, show }) =>
                            show ? (
                                <NavLink
                                    key={label}
                                    to={to}
                                    className={navLinkClass}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        {icon}
                                        {label}
                                    </div>
                                </NavLink>
                            ) : null
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header
