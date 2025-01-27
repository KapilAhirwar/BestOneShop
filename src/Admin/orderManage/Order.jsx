import { useState } from "react";
import { useAdminHook } from "../AdminHook/AdminHook";
import Modal from "../Modal";
import OrderDetailsPage from "./orderDetail";

const Orders = () => {
  const { orders, loading, updateOrderStatus } = useAdminHook();
  const [localOrders, setLocalOrders] = useState(orders); // Local state for orders
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sync local orders with fetched orders
  useState(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleDetail = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
  };

  const handleCloseOrderDetail = () => {
    setSelectedOrder(null);
    setOpenDetail(false);
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    updateOrderStatus(orderId, status); // Update backend
    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, deliveryStatus: status } : order
      )
    ); // Update UI immediately
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div class="p-6">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Manage Orders</h1>
      <table class="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <thead>
          <tr class="bg-blue-600 text-white">
            <th class="p-4 text-center border border-gray-300">Order ID</th>
            <th class="p-4 text-center border border-gray-300">Customer Name</th>
            <th class="p-4 text-center border border-gray-300">Order Status</th>
            <th class="p-4 text-center border border-gray-300">Payment Status</th>
            <th class="p-4 text-center border border-gray-300">View Details</th>
            <th class="p-4 text-center border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {localOrders.map((order) => (
            <tr
              key={order.orderId}
              className="border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100"
            >
              <td class="p-4 text-center border border-gray-300">{order.orderId}</td>
              <td class="p-4 text-center border border-gray-300">{order.customerDetails.name}</td>
              <td class="p-4 text-center border border-gray-300">{order.deliveryStatus}</td>
              <td class="p-4 text-center border border-gray-300">{order.paymentStatus}</td>
              <td class="p-4 text-center border border-gray-300">
                <button
                  onClick={() => handleDetail(order)}
                  class="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600"
                >
                  Detail
                </button>
              </td>
              <td class="p-4 text-center border border-gray-300">
                <div class="flex flex-wrap justify-center gap-1">
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Pending")}
                    class="px-2 py-1 bg-yellow-500 text-white text-xs rounded-md hover:bg-yellow-600"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Processing")}
                    class="px-2 py-1 bg-cyan-500 text-white text-xs rounded-md hover:bg-cyan-600"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Packed")}
                    class="px-2 py-1 bg-purple-500 text-white text-xs rounded-md hover:bg-purple-600"
                  >
                    Packed
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Shipped")}
                    class="px-2 py-1 bg-indigo-500 text-white text-xs rounded-md hover:bg-indigo-600"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Delivered")}
                    class="px-2 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order.orderId, "Cancelled")}
                    class="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
                  >
                    Cancelled
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openDetail && selectedOrder && (
        <Modal>
          <OrderDetailsPage order={selectedOrder} onClose={handleCloseOrderDetail} />
        </Modal>
      )}
    </div>
  );
};

export default Orders;
