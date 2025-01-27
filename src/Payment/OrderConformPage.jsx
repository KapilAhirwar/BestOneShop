import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const { data, order } = location.state || {};

    // Helper function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Calculate delivery date (7 days after the order date)
    const calculateDeliveryDate = (orderDate) => {
        if (!orderDate) return '';
        const orderDateObj = new Date(orderDate);
        orderDateObj.setDate(orderDateObj.getDate() + 7); // Add 7 days
        return orderDateObj.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Order Confirmed!</h1>
            <p className="text-lg text-center text-gray-700 mb-8">Thank you for your purchase.</p>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-2">
                    <p><strong className="font-medium">Order ID:</strong> {data?.orderId || order?.orderId}</p>
                    <p><strong className="font-medium">Total Amount:</strong> ₹{order?.totalAmount || data?.orderDetail.totalAmount}</p>
                    <p><strong className="font-medium">Payment ID:</strong> {data?.paymentId || "CASH ON DELIVERY"}</p>
                    <p><strong className="font-medium">Order Date:</strong> {formatDate(data?.createdAt || order?.createdAt)}</p>
                    <p><strong className="font-medium">Delivery Date:</strong> {calculateDeliveryDate(data?.createdAt || order?.createdAt)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Details</h2>
                <div className="space-y-2">
                    <p><strong className="font-medium">Name:</strong> {order?.userName}</p>
                    <p><strong className="font-medium">Email:</strong> {order?.userEmail}</p>
                    <p><strong className="font-medium">Address:</strong> {order?.deliveryAddress || data?.orderDetail.deliveryAddress}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
                <ul className="space-y-2">
                    {order?.products.map((product) => (
                        <li key={product.product._id} className="flex justify-between">
                            <span className="text-gray-700">{product.product.name} (x{product.quantity})</span>
                            <span className="font-medium text-gray-900">₹{product.product.price}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default OrderConfirmation;
