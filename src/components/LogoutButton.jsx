import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await authService.logout()
        dispatch(logout())
        navigate("/login")
    }

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer px-5 py-3 rounded-full transition bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-2"
        >
            <FaSignOutAlt size={14} />
            Logout
        </button>
    )
}

export default LogoutButton
