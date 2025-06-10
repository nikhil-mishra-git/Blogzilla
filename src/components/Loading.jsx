import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3 h-3 bg-black rounded-full animate-bounce" />
      </div>
      <p className="text-xl font-semibold">{message}</p>
    </div>
  );
};

export default Loader;
