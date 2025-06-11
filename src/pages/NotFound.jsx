import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const NotFound = () => {
    return (
        <section className="py-16 flex flex-col items-center justify-center bg-white px-4">
            <h1 className="text-[120px] font-extrabold text-black">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page not found</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
                <FaArrowLeft /> Go Back Home
            </Link>
        </section>
    )
}

export default NotFound
