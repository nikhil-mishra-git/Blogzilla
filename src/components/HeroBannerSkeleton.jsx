import React from 'react';

const HeroBannerSkeleton = () => {
    return (
        <section className="flex my-8 flex-col md:flex-row items-center gap-10 justify-between max-w-[1350px] mx-auto px-6 py-8 animate-pulse">

            {/* Left Side: Text Content Skeleton */}
            <div className="flex flex-col gap-5 w-full md:w-1/2 text-center md:text-left">
                <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto md:mx-0" />
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-2 bg-gray-200 rounded" />
                    <div className="h-3 w-28 bg-gray-200 rounded" />
                </div>
                <div className="space-y-2 mt-4">
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-5/6 bg-gray-200 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-40 bg-gray-300 rounded-full mx-auto md:mx-0 mt-4" />
            </div>

            {/* Right Side: Image Skeleton */}
            <div className="w-full md:w-1/2 md:mt-0 mt-8">
                <div className="w-full h-90 bg-gray-300 rounded-2xl" />
            </div>

        </section>
    );
};

export default HeroBannerSkeleton;
