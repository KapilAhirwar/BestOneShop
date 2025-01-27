// Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import AddProduct from './AddProduct';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center align-center ">
      <div className="bg- p-0 rounded-lg shadow-lg w-[100%] overflow-y-auto h-full">
        {/* <button className="absolute top-4 right-4 text-gray-500 border-2" onClick={onClose}><FaTimes /></button> */}
        {children}
        {/* <AddProduct/> */}
      </div>
    </div>
  );
};

export default Modal;
