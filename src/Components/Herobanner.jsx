import React from 'react';
import HerobannerImage from '../assets/Herobanner.jpg';

const Herobanner = () => {
    return (
        <section className="flex my-8 flex-col md:flex-row items-center gap-10 justify-between max-w-[1350px] mx-auto px-6 py-8">
            {/* Left Side: Blog Title, Author, Date, Description, and Button */}
            <div className="flex flex-col gap-5 w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 leading-snug">
                    Blog Title Goes Here
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                    <span>By <span className="font-semibold">Author Name</span></span>
                    <span>&bull;</span>
                    <span>Published on <span className="font-semibold">May 6, 2025</span></span>
                </div>

                {/* Blog Description */}
                <p className="text-gray-700 mt-4 text-justify">
                    This is a brief description of the blog post. It gives a sneak peek of the content and encourages the reader to click through and read more.
                    This section can be dynamic based on your blog content.
                </p>

                {/* Read More Button */}
                <button className="px-6 py-3 w-40 mt-4 bg-black text-white rounded-full focus:outline-none">
                    Read More
                </button>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 md:mt-0 mt-8">
                <img
                    src={HerobannerImage}
                    alt="Blog Banner"
                    className="w-full h-auto object-cover rounded-2xl"
                />
            </div>
        </section>
    );
};

export default Herobanner;
