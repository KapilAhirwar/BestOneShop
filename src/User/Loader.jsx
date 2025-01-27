// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]  bg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
