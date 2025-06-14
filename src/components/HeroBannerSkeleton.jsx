import React from 'react';

const HeroBannerSkeleton = () => {
    return (
        <section className="flex my-8 flex-col-reverse md:flex-row items-center gap-10 justify-between max-w-[1400px] mx-auto px-4 pt-0 md:py-8 animate-pulse">

            {/* Left Side: Text Content Skeleton */}
            <div className="flex flex-col gap-5 w-full md:w-1/2 text-left">
                {/* Title */}
                <div className="h-8 bg-gray-300 rounded w-3/4" />

                {/* Author and Date */}
                <div className="flex items-center gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-2 bg-gray-200 rounded" />
                    <div className="h-3 w-28 bg-gray-200 rounded" />
                </div>

                {/* Content lines (simulate line-clamp-4) */}
                <div className="space-y-2 mt-2">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-11/12 bg-gray-200 rounded" />
                    <div className="h-3 w-10/12 bg-gray-200 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* Button skeleton */}
                <div className="h-10 w-40 bg-gray-300 rounded-full mt-4" />
            </div>

            {/* Right Side: Image Skeleton */}
            <div className="w-full md:w-1/2">
                <div className="w-full h-55 md:h-[350px] bg-gray-300 rounded-2xl" />
            </div>

        </section>
    );
};

export default HeroBannerSkeleton;
