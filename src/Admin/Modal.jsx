// Modal.js
import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center align-center ">
      <div className="bg- p-0 rounded-lg shadow-lg w-[100%] overflow-y-auto h-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;
