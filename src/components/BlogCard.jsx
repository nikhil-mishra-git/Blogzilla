import React from 'react';
import blogServices from '../services/blogService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ $id, title, content, author, $createdAt, coverImage }) => {
  
  return (
    <Link to={`/blog/${$id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col max-w-sm mx-auto
                      h-[420px]"> 
        
        {/* Cover Image */}
        <img
          src={`${blogServices.filePreview(coverImage)}`}
          alt="Blog Banner"
          className="w-full h-48 object-cover" 
        />

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 text-left">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-l text-justify mt-2 mb-6 line-clamp-3 flex-grow">
            {content}
          </p>

          {/* Footer: Author and Button */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              {author} • {new Date($createdAt).toLocaleDateString()}
            </span>

            <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition">
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
