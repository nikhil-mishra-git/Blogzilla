import React from 'react';

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse h-[420px] max-w-sm w-full mx-auto">
      {/* Image Placeholder */}
      <div className="bg-gray-300 h-48 w-full"></div>

      {/* Content Placeholder */}
      <div className="p-6 flex flex-col space-y-4 h-[calc(100%-12rem)]">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          <div className="h-4 w-28 bg-gray-300 rounded"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
