import { useLocation, useParams } from "react-router-dom";

const OrderDetailPage = () => {
  const location = useLocation();
  const { id } = useParams(); // /orderDetails/:id se milega
  const order = location.state?.order;

  if (!order) {
    return <div className="text-center py-10">❌ No order details found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h1>
      {/* Products */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Products</h2>
        <div className="space-y-3">
          {order.products.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-3">
              <img 
                src={item.item_img} 
                alt="product" 
                className="w-16 h-16 rounded-md object-cover border"
              />
              <div>
                <p><span className="font-semibold">Product ID:</span> {item.item_id}</p>
                <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                <p><span className="font-semibold">Size:</span> {item.userSize || "N/A"}</p>
                <p><span className="font-semibold">Color:</span> {item.userColor || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Delivery Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Delivery</h2>
        <p><span className="font-semibold">Address:</span> {order.deliveryAddress}</p>
        <p><span className="font-semibold">Status:</span> 
          <span className={`ml-2 ${order.deliveryStatus === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
            {order.deliveryStatus}
          </span>
        </p>
        <p><span className="font-semibold">Delivered At:</span> {new Date(order.deliveredAt).toLocaleString()}</p>
      </div>

      {/* Payment Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Payment</h2>
        <p><span className="font-semibold">Status:</span> 
          <span className={`ml-2 ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
            {order.paymentStatus}
          </span>
        </p>
        <p><span className="font-semibold">Invoice ID:</span> {order.invoiceId}</p>
        <p><span className="font-semibold">Payment ID:</span> {order.paymentId}</p>
        <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Customer Info</h2>
        <p><span className="font-semibold">Name:</span> {order.customerDetails?.name}</p>
        <p><span className="font-semibold">Email:</span> {order.customerDetails?.email}</p>
        <p><span className="font-semibold">Phone:</span> {order.customerDetails?.phone}</p>
      </div>

      {/* Price Info */}
      <div className="mt-6 border-t pt-4">
        <p><span className="font-semibold">Subtotal:</span> ₹{order.totalAmount.toFixed(2)}</p>
        <p><span className="font-semibold">Discount:</span> ₹{order.discountAmount}</p>
        <p className="text-xl font-bold text-gray-900 mt-2">
          Total: ₹{(order.totalAmount - order.discountAmount).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailPage;
