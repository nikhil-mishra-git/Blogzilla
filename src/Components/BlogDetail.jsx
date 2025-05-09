import React from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import BlogImage from '../assets/Herobanner.jpg';

const BlogDetail = () => {
    return (
        <main className="max-w-[1350px] mx-auto px-6 py-12 text-gray-800">
            <div className="mx-auto">
                {/* Title + Author Info */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-4 leading-snug text-center md:text-left">
                        How to Find Creativity in Everyday Life
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                        <span>By <span className="font-semibold">Jane Doe</span></span>
                        <span>&bull;</span>
                        <span>May 6, 2025</span>
                    </div>
                </div>

                {/* Image */}
                <div className="w-full mb-10">
                    <img
                        src={BlogImage}
                        alt="Blog Cover"
                        className="w-full max-w-4xl m-auto h-auto object-cover rounded-xl"
                    />
                </div>

                {/* Blog Content */}
                <article className="prose prose-lg prose-gray max-w-none mb-12 leading-relaxed text-justify">
                    <p>
                        Creativity isn’t just for artists or writers. It's a mindset that can
                        be cultivated in your everyday routines—from how you approach
                        problem-solving at work to how you enjoy your morning coffee.
                    </p>
                    <p>
                        In this post, we'll explore techniques and philosophies that can help
                        you see the world differently and unlock your inner creative thinker.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800">Start with Observation</h2>
                    <p>
                        The world around you is full of inspiration. Whether you're walking
                        through a park or scrolling online, notice patterns, colors, and ideas.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800">Practice Everyday Curiosity</h2>
                    <p>
                        Ask questions. Break routines. Experiment with small changes in your
                        daily activities to invite fresh thinking.
                    </p>

                    <blockquote className="text-gray-600 border-l-4 border-gray-300 pl-4 italic">
                        “Creativity is intelligence having fun.” – Albert Einstein
                    </blockquote>

                    <p>
                        The more you flex your creativity muscle, the more natural it becomes.
                        Start small. Reflect often. You'll be amazed at what you come up with.
                    </p>
                </article>

                {/* Like & Views */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <FaHeart className="text-red-500" />
                        <span className="font-medium">234 Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEye className="text-gray-500" />
                        <span className="font-medium">1,230 Views</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogDetail;
