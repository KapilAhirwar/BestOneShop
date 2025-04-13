import { FcDeleteDatabase } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAppContext } from "../useContextHook/context";

const CartItem = ({ item, quantity, onUpdateQuantity }) => {
  const { removeFromCart } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  let item1 = item.productId;
  const removeItemFromCart = () => {
    removeFromCart(item1._id);
    toast.success("Item Removed");
  };

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < item1.stock) {
      onUpdateQuantity(item1._id, quantity + 1);
    } else {
      toast.error("Cannot add more than available stock");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(item1._id, quantity - 1);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      {/* Image and Details */}
      <div className="flex items-center space-x-4">
        <div className="w-[180px] overflow-hidden rounded-md bg-gray-100">
          <img
            src={item1?.images?.[0] || "/placeholder-image.png"}
            alt={item1?.name || "Product Image"}
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800">{item1?.name || "Unknown Product"}</h1>
          <p className="text-sm text-gray-500">
            {item1?.description ? (
              isExpanded ? item1?.description : `${item1?.description.slice(0, 150)}...`
            ) : (
              "No description available."
            )}
            {item1?.description && (
              <button
                onClick={toggleDescription}
                className="text-blue-500 hover:underline ml-1"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Quantity Controls and Price */}
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecreaseQuantity}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            aria-label="Decrease Quantity"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            aria-label="Increase Quantity"
          >
            +
          </button>
        </div>
        <p className="text-xl font-semibold text-gray-900">{`₹${item1?.price}`}</p>
        <div
          className="cursor-pointer mt-2 p-2 rounded-full hover:bg-gray-200 transition duration-200"
          onClick={removeItemFromCart}
          aria-label="Remove Item"
        >
          <FcDeleteDatabase className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;