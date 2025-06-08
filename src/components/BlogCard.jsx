import React from 'react';
import blogServices from '../services/blogService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ $id, title, content, author, publishDate, coverImage }) => {
    return (
        <Link to={`/blog/${$id}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col max-w-sm mx-auto">

                {/* Image */}
                <img
                    src={blogServices.filePreview(coverImage)}
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
                    <p className="text-gray-600 text-sm mb-6 text-center line-clamp-3">
                        {content}
                    </p>

                    {/* Footer: Author + Arrow Button */}
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-zinc-700">
                            {author} • {publishDate}
                        </span>

                        <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition">
                            <FaArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
