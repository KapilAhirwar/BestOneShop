// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../useContextHook/context";
// import "../pages/product.css"; // Import the CSS file

// const Product = ({ post }) => {
//   const { addToCart, removeFromCart, cart } = useAppContext();
//   const navigate = useNavigate();

//   const addItemCart = () => {
//     addToCart(post);
//     toast.success("Item added to Cart");
//   };

//   const removeItemFromCart = () => {
//     removeFromCart(post._id);
//     toast.error("Item removed from Cart");
//   };

//   const handleProductDetail = () => {
//     navigate("/ProductDetail", { state: { product: post } });
//   };

//   return (
//     <div className="card">
//       {/* Product Details */}
//       <div onClick={handleProductDetail} className="product-details">
//         <p className="title">{post.title}</p>
//         <div className="image-container">
//           <img
//             src={post.images[0]}
//             alt={post.title}
//             className="product-image"
//           />
//         </div>
//         <p className="description">
//           {post.description.split(" ").slice(0, 7).join(" ") + "..."}
//         </p>
//       </div>

//       {/* Price and Button */}
//       <div className="price-button-container">
//         <p className="price">{post.price}</p>
//         {/* {cart.some((p) => p._id === post._id) ? (
//           <button
//             className="price-button remove-from-cart"
//             onClick={removeItemFromCart}
//           >
//             REMOVE ITEM
//           </button>
//         ) : (
//           <button
//             className="price-button add-to-cart"
//             onClick={addItemCart}
//           >
//             ADD TO CART
//           </button>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Product;

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../useContextHook/context";
import { useState, useEffect } from "react";


const Product = ({ post }) => {
  // const { addToCart, removeFromCart, cart } = useAppContext();
  const navigate = useNavigate();

  // const addItemCart = () => {
  //   addToCart(post);
  //   toast.success("Item added to Cart");
  // };

  // const removeItemFromCart = () => {
  //   removeFromCart(post._id);
  //   toast.error("Item removed from Cart");
  // };

  const handleProductDetail = () => {
    navigate("/ProductDetail", { state: { product: post } });
  };

  // const isInCart = cart?.some((p) => p._id === post._id);

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // console.log(width);

  const wid = width<480 ? (width/2)-24:215;
  const len = width<480 ? 310:340;
  // console.log("len : ",len);

  return (
    // <Card
    //   sx={{
    //     maxWidth: 180,
    //     borderRadius: 3,
    //     boxShadow: 3,
    //     transition: "all 0.3s ease",
    //     "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
    //     cursor: "pointer",
    //   }}
    // >
    //   {/* Product Image */}
    //   <CardMedia
    //     component="img"
    //     height="180"
    //     image={post.images[0]}
    //     alt={post.title}
    //     onClick={handleProductDetail}
    //     sx={{ objectFit: "cover" }}
    //   />

    //   {/* Product Info */}
    //   <CardContent onClick={handleProductDetail}>
    //     <Typography
    //       variant="h6"
    //       fontWeight={600}
    //       gutterBottom
    //       noWrap
    //       title={post.title}
    //     >
    //       {post.title}
    //     </Typography>

    //     <Typography
    //       variant="body2"
    //       color="text.secondary"
    //       sx={{ height: 40, overflow: "hidden" }}
    //     >
    //       {post.description.split(" ").slice(0, 10).join(" ") + "..."}
    //     </Typography>
    //   </CardContent>

    //   {/* Price and Action Buttons */}
    //   <CardActions
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       px: 2,
    //       pb: 2,
    //     }}
    //   >
    //     <Typography variant="subtitle1" fontWeight="bold" color="primary">
    //       ₹{post.price}
    //     </Typography>

    //     {isInCart ? (
    //       <Button
    //         variant="outlined"
    //         color="error"
    //         size="small"
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           removeItemFromCart();
    //         }}
    //       >
    //         Remove
    //       </Button>
    //     ) : (
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           addItemCart();
    //         }}
    //       >
    //         Add to Cart
    //       </Button>
    //     )}
    //   </CardActions>
    // </Card>
    <Card
      sx={{
        width: wid, // fixed width for all cards
        height: len, // fixed height to make all cards same size
        borderRadius: 3,
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 1,
        py: 1,
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="130" // fixed height for images
        image={post.images[0]}
        alt={post.title}
        onClick={handleProductDetail}
        sx={{ objectFit: "cover" }}
      />

      {/* Product Info */}
      <CardContent
        onClick={handleProductDetail}
        sx={{
          flexGrow: 1,
          px: 1,
          py: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          noWrap
          title={post.title}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {post.description}
        </Typography>
      </CardContent>

      {/* Price and Actions */}
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          pb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          ₹{post.price}
        </Typography>

        {/* {isInCart ? (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              removeItemFromCart();
            }}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              addItemCart();
            }}
          >
            Add
          </Button>
        )} */}
      </CardActions>
    </Card>

  );
};

export default Product;
