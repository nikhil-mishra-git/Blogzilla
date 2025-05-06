import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import HerobannerImage from '../assets/Herobanner.jpg';

const Blogcard = () => {
    return (
        <div className="bg-white shadow-md overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <img
                src={HerobannerImage}
                alt="Card Image"
                className="w-full h-60 object-cover"
            />

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Blog Title Goes Here
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                    A short and engaging description that gives readers a peek into the blog content.
                </p>

                {/* Read More Arrow Button */}
                <div className="flex justify-end">
                    <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition">
                        <FaArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blogcard;
