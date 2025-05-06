import React, { useState } from 'react';
import Blogcard from './Blogcard';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const BlogcardSection = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    const totalCards = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className="max-w-[1350px] mx-auto px-4 py-8">
            <h2 className="text-3xl uppercase font-bold text-gray-800 mb-4">Latest Blogs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:gap-8">
                {totalCards.slice(0, visibleCount).map((_, index) => (
                    <Blogcard key={index} />
                ))}
            </div>

            {visibleCount < totalCards.length && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="flex items-center mt-10 gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                        Load More <HiOutlineChevronDoubleDown size={20} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default BlogcardSection;
