import React from 'react';
import blogServices from '../services/blogService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearSearchQuery } from '../features/searchSlice';

const BlogCard = ({ $id, title, content, author, $createdAt, coverImage }) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/blog/${$id}`}
      onClick={() => dispatch(clearSearchQuery())}
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col max-w-sm mx-auto h-[420px]">
        <img
          src={blogServices.filePreview(coverImage)}
          alt="Blog Banner"
          className="w-full h-48 object-cover"
        />

        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-1 text-left">
            {title}
          </h2>

          <p className="text-gray-700 text-l text-justify mt-2 mb-6 line-clamp-3 flex-grow">
            {content}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              {author} • {new Date($createdAt).toLocaleDateString('en-IN')}
            </span>

            <button className="w-10 h-10 cursor-pointer flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition">
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
