import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const OrderDetailsPage = ({ onClose, order }) => {
  const [photoSlider, setPhotoSlider] = useState([]); // Stores selected product photos
  const [selectedPhoto, setSelectedPhoto] = useState(null); // For the large photo

  const handleProductClick = (photos) => {
    setPhotoSlider(photos);
    setSelectedPhoto(photos[0]); // Show the first photo as default
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto h-[95%] flex flex-col bg-gray-200 rounded-md m-2 relative overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Order Details</h1>
        <button onClick={onClose} className="text-red-500 text-lg">
          <FaTimes />
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Customer Details - Left Side */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Customer Details</h2>
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Customer Name:</strong> {order.customerDetails.name}</p>
            <p><strong>Email:</strong> {order.customerDetails.email}</p>
            <p><strong>Shipping Address:</strong> {order.deliveryAddress}</p>
            <p><strong>Order Status:</strong> {order.deliveryStatus}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          </div>
        </div>

        {/* Photo Slider - Right Side */}
        {photoSlider.length > 0 && (
          <div className="flex-1 bg-white p-4 shadow-lg rounded">
            <div onClick={() => setPhotoSlider([])} className="text-red-500 flex justify-end mb-4">
              <FaTimes />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Large Photo */}
              {selectedPhoto && (
                <img
                  src={selectedPhoto}
                  alt="Selected"
                  className="w-full md:w-[300px] h-auto md:h-[300px] object-cover rounded mb-4"
                />
              )}

              {/* Small Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {photoSlider.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setSelectedPhoto(photo)} // Update large photo on click
                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                      selectedPhoto === photo ? "border-blue-500" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product List - Bottom */}
      <div className="">
        <table className="w-full min-w-[720px] border-collapse border rounded-lg shadow-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="border p-2 md:p-3 text-center font-semibold">Product</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Size</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Number</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Color</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Quantity</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Price</th>
              <th className="border p-2 md:p-3 text-center font-semibold">Description</th>
              <th className="border p-2 md:p-3 text-center font-semibold">View Photos</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="border p-2 md:p-3 text-center">{item.product.name}</td>
                <td className="border p-2 md:p-3 text-center">{item.product.size}</td>
                <td className="border p-2 md:p-3 text-center">{item.product.number}</td>
                <td className="border p-2 md:p-3 text-center">{item.product.color}</td>
                <td className="border p-2 md:p-3 text-center">{item.quantity}</td>
                <td className="border p-2 md:p-3 text-center">{item.product.price}</td>
                <td className="border p-2 md:p-3 text-left w-[250px]">
                  {item.product.description}
                </td>
                <td className="border p-2 md:p-3 text-center">{console.log(item.product.images)}
                  <button
                    onClick={() => handleProductClick(item.product.images)}
                    className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View Photos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
