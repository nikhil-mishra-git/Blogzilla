import React from 'react';
import blogServices from '../services/blogService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroBanner = ({ blog }) => {
    if (!blog) return null;

    const {
        $id,
        title,
        author,
        $createdAt,
        content,
        coverImage
    } = blog;

    return (
        <section className="flex my-8 flex-col-reverse md:flex-row items-center gap-10 justify-between max-w-[1400px] mx-auto px-4 pt-0 md:py-8">
            {/* Left Side: Text Content */}
            <div className="flex flex-col gap-5 w-full md:w-1/2 text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug">
                    {title}
                </h1>

                <div className="flex items-center justify-start gap-2 text-sm text-gray-600">
                    <span>By : <span className="font-semibold">{author}</span></span>
                    <span>&bull;</span>
                    <span>
                        Published on : <span className="font-semibold">
                            {new Date($createdAt).toLocaleDateString('en-IN')}
                        </span>
                    </span>
                </div>

                <p className="text-gray-700 text-lg mt-2 md:mt-4 text-justify line-clamp-4">
                    {content}
                </p>

                <Link
                    to={`/blog/${$id}`}
                    className="px-6 py-3 w-40 mt-4 bg-black text-white rounded-full focus:outline-none flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                >
                    Read More <FaArrowRight size={14} />
                </Link>

            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2">
                <img
                    src={blogServices.filePreview(coverImage).toString()}
                    alt="Blog Cover"
                    className="w-full h-55 md:h-auto max-h-90 object-cover rounded-2xl"
                />
            </div>
        </section>
    );
};

export default HeroBanner;
