// Modal.js
import React from 'react';
import Loader from './Loader';

const LoaderPopUpOpen = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex items-center justify-center">
      <div className="bg- p-6 w-[50%] max-w-lg text-center text-xl font-bold">
        <Loader/>
      <span className='text-white text-[1.5rem]'>{text}</span>

      </div>
    </div>
  );
};

export default LoaderPopUpOpen;
