// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CartItem from "../components/CartItem";
// import { useAppContext } from "../useContextHook/context";

// const Cart = () => {
//   const { updatedCart, setUpdatedCart } = useAppContext();
//   const [totalAmount, setTotalAmount] = useState(0);
//   // const [count, setcount] = useState();

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Recalculate total amount whenever updatedCart changes
//     setTotalAmount(
//       updatedCart.reduce(
//         (acc, curr) => acc + curr.product.price * curr.quantity,
//         0
//       )
//     );
//   }, [updatedCart]);

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     const newCart = updatedCart.map((item) =>
//       item.product._id === productId
//         ? { ...item, quantity: newQuantity }
//         : item
//     );
//     setUpdatedCart(newCart);
//   };


//   const handleCheckout = () => {
//     // console.log("final -> ",updatedCart);
//     // const selectedCart = updatedCart.map((item) => ({
//     //   product: {
//     //     _id: item.product._id,
//     //     name: item.product.name,
//     //     price: item.product.price,
//     //     stock: item.product.stock,
//     //   },
//     //   quantity: item.quantity,
//     // }));

//     navigate("/checkout", {
//       state: {
//         updatedCart,
//         totalAmount,
//       },
//     });
//   };

//   return (
//     <div className="flex justify-center p-6">
//       {updatedCart.length > 0 ? (
//         <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
//           <div className="flex-1 space-y-4 max-h-[80vh] overflow-y-auto">
//             {updatedCart.map((item) => (
//               <CartItem
//                 key={item.product._id}
//                 item={item.product}
//                 quantity={item.quantity}
//                 onUpdateQuantity={handleUpdateQuantity}
//               />
//             ))}
//           </div>
//           <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-full">
//             <h2 className="text-[1.5rem] font-semibold text-gray-800 mb-4">Summary</h2>
//             <div>
//               {/* Cart Items */}
//               <div className="text-lg text-gray-800 space-y-2 pb-5 ">
//                 {updatedCart.length > 0 ? (
//                   updatedCart.map((item, index) => (
//                     <p key={index} className="flex justify-between items-center">
//                       <span>{`${item.product.name} x ${item.quantity}`}</span>
//                       <span>{`₹${item.product.price * item.quantity}`}</span>
//                     </p>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">Your cart is empty.</p>
//                 )}
//               </div>

//               {/* Total Items and Amount */}
//               <div className=" flex justify-between pb-5 border-red-200 ">
//                 <p className="text-xl text-gray-600">Total Items: {updatedCart.length}</p>
//                 <p className="text-xl font-semibold text-gray-900 mb-4">{`₹${totalAmount}`}</p>
//               </div>
//               {/* Checkout Button */}
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//                 aria-label="Proceed to checkout"
//                 disabled={updatedCart.length === 0} // Disable button if cart is empty
//               >
//                 CheckOut Now
//               </button>
//             </div>
//           </div>

//         </div>
//       ) : (
//         <div className="flex flex-col justify-center items-center w-full h-[88vh] text-center border-2">
//           <h1 className="text-2xl font-semibold text-gray-800">Cart is Empty</h1>
//           <Link to={"/"} className="mt-4">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useAppContext } from "../useContextHook/context";

const Cart = () => {
  const { updatedCart, setUpdatedCart } = useAppContext();
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(
      updatedCart.reduce(
        (acc, curr) => acc + curr.product?.productId?.price * curr.quantity,
        0
      )
    );
  }, [updatedCart]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    // console.log(updatedCart[0].quantity, newQuantity);
    const newCart = updatedCart.map((item) =>
      item.product.productId._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setUpdatedCart(newCart);
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        updatedCart,
        totalAmount,
      },
    });
  };

  return (
    <div className="flex justify-center p-4 sm:p-6">
      {updatedCart.length > 0 ? (
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 sm:gap-10">
          {/* Cart Items Section */}
          <div className="flex-1 space-y-4 max-h-[70vh] overflow-y-auto">
            {updatedCart.map((item) => (
              // console.log(item.product?.productId?._id),
              <CartItem
                key={item.product?.productId?._id}
                item={item.product}
                quantity={item.quantity}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-auto lg:h-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Summary
            </h2>
            <div>
              {/* Cart Items */}
              <div className="text-sm sm:text-lg text-gray-800 space-y-2 pb-4">
                {updatedCart.map((item, index) => (
                  <p
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span>{`${item.product?.productId?.name} x ${item.quantity}`}</span>
                    <span>{`₹${item.product?.productId?.price * item.quantity}`}</span>
                  </p>
                ))}
              </div>

              {/* Total Items and Amount */}
              <div className="flex justify-between pb-5">
                <p className="text-base sm:text-lg text-gray-600">
                  Total Items: {updatedCart.length}
                </p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {`₹${totalAmount}`}
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                aria-label="Proceed to checkout"
                disabled={updatedCart.length === 0}
              >
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[80vh] text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h1>
          <Link to={"/"} className="mt-4">
            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
