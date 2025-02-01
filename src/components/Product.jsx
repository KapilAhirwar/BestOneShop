import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";
import "../pages/product.css"; // Import the CSS file

const Product = ({ post }) => {
  const { addToCart, removeFromCart, cart } = useAppContext();
  const navigate = useNavigate();

  const addItemCart = () => {
    addToCart(post);
    toast.success("Item added to Cart");
  };

  const removeItemFromCart = () => {
    removeFromCart(post._id);
    toast.error("Item removed from Cart");
  };

  const handleProductDetail = () => {
    navigate("/ProductDetail", { state: { product: post } });
  };

  return (
    <div className="card">
      {/* Product Details */}
      <div onClick={handleProductDetail} className="product-details">
        <p className="title">{post.title}</p>
        <p className="description">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
        <div className="image-container">
          <img
            src={post.images[0]}
            alt={post.title}
            className="product-image"
          />
        </div>
      </div>

      {/* Price and Button */}
      <div className="price-button-container">
        <p className="price">{post.price}</p>
        {cart.some((p) => p._id === post._id) ? (
          <button
            className="price-button remove-from-cart"
            onClick={removeItemFromCart}
          >
            REMOVE ITEM
          </button>
        ) : (
          <button
            className="price-button add-to-cart"
            onClick={addItemCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
