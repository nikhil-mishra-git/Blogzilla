import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import HerobannerImage from '../assets/Herobanner.jpg';
import blogServices from '../appwrite/blogService'
import { Link } from 'react-router-dom';

const Blogcard = ({ $id, title, content, author, publishDate }) => {
    return (
        <Link to={`/blog/${$id}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col max-w-sm mx-auto">
                {/* Image */}
                <img
                    src={blogServices.getImagePrev(bannerImage)}
                    alt="Blog Banner"
                    className="w-full h-52 object-cover"
                />

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug text-center">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 text-center">
                        {content}
                    </p>

                    {/* Footer: Author + Arrow Button */}
                    <div className="flex items-center justify-between mt-auto">
                        {/* Author and Date */}
                        <span className="text-xs text-zinc-700">{author} • {publishDate}</span>

                        {/* Arrow Button */}
                        <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition">
                            <FaArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Blogcard;
