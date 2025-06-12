import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import {Notification} from '../components'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            Notification.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            Notification.error("Failed to logout. Please try again.");
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer px-5 py-3 rounded-md transition bg-gray-100 text-black hover:bg-red-500 hover:text-white flex items-center gap-2"
        >
            <FaSignOutAlt size={14} />
            Logout
        </button>
    )
}

export default LogoutButton
