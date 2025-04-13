import React, { useEffect, useState } from "react";
import { useAppContext } from "../useContextHook/context";
import { useRozerpay } from "./RozerpayHook";
import proceedWithRazorpay from "./Rozerpay";
import { useLocation } from "react-router-dom";
import LoaderPopUpOpen from "../User/loaderOpener";

const Checkout = ({ gstRate = 18, discountRate = 20 }) => {
  const { data, updatedCart, } = useAppContext();
  const { createOrder, PaymentSuccess, paymentVerify, createOrderCOD, paymentLoader, setPaymentLoader } = useRozerpay();
  const userData = data?.user_data || {};
  let location = userData?.address;

  const formatAddresses = () => {
    if (!location || location.length === 0) {
      console.log("No address available.");
      return [];
    }

    const formattedAddresses = location.map((element, index) => {
      const {
        fullName = "",
        addressLine1 = "",
        phone = "",
        landmark = "",
        district = "",
        city = "",
        pincode = "",
        state = "",
        country = "",
      } = element;
      const addressString = `${addressLine1}, ${phone}, ${landmark}, ${city}, ${district}, ${state}, ${pincode}, ${country}`;
      return `${addressString}`;
    });
    return formattedAddresses;
  };
  const result = formatAddresses();

  const [billingDetails, setBillingDetails] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: result[0] || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    let subtotal = 0;
    updatedCart.map((it, index) => {
      subtotal += it.product.productId.price * it.quantity;
    });
    // console.log("subtotal", subtotal);
    const discount = (subtotal * discountRate) / 100;
    const gst = ((subtotal - discount) * gstRate) / 100;
    return {
      subtotal,
      discount,
      gst,
      total: subtotal - discount + gst,
    };
  };

  const { subtotal, discount, gst, total } = calculateTotal();

  const handleCheckout = async () => {
    setPaymentLoader(true);
    // Validate required fields
    if (
      !billingDetails.name ||
      !billingDetails.email ||
      !billingDetails.address ||
      !billingDetails.phone ||
      !paymentMethod
    ) {
      alert("Please fill out all required fields.");
      setPaymentLoader(false);
      return;
    }
    
    try {
      // Calculate order totals
      let order = {
        userName:billingDetails?.name,
        userEmail:billingDetails?.email,
        deliveryAddress:billingDetails?.address,
        orderId:"",
        totalAmount:total,
        products:updatedCart,  //agr user addToCart se direct krege 
        //to no issue handle for specific order
      };
      
      // Create an order and retrieve necessary details
      if (paymentMethod === "Razorpay") {
        const { orderId, key } = await createOrder(
          total,
          userData._id,
          updatedCart,
          billingDetails.address,
        );
        order.orderId = orderId;
        
        // Proceed with Razorpay payment
        // setPaymentLoader(false);
        await proceedWithRazorpay({orderId, total, billingDetails, key, paymentVerify, order, setPaymentLoader});
        
        console.log("Payment process completed.");
      } else if (paymentMethod === "COD") {
        const response = await createOrderCOD(
          total,
          userData._id,
          updatedCart,
          billingDetails.address,
          paymentMethod, order,
        );
        setPaymentLoader(false);
        // Handle Cash on Delivery (COD)
        alert("Cash on Delivery selected! Your order will be shipped soon.");
        // Optional: Call a function to save COD order to backend
      } else {
        setPaymentLoader(false);
        alert("Please select a valid payment method.");
      }
    } catch (error) {
      setPaymentLoader(false);
      console.error("Order creation failed:", error.message || error);
      alert("There was an error while processing your order. Please try again.");
    }
  };
  
  if (!updatedCart?.length) {
    return <div className="text-center">Your cart is empty!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>

      {/* Billing Details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Billing Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billingDetails.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={billingDetails.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={billingDetails.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Address Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="useNewAddress"
              checked={useNewAddress}
              onChange={() => {
                setUseNewAddress(!useNewAddress);
                if (!useNewAddress)
                  setBillingDetails((prev) => ({ ...prev, address: "" }));
                else
                  setBillingDetails((prev) => ({
                    ...prev,
                    address: result,
                  }));
              }}
              className="form-checkbox"
            />
            <label htmlFor="useNewAddress" className="text-gray-700">
              Use a new address
            </label>
          </div>

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={billingDetails.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!useNewAddress}
          ></textarea>
        </form>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
        <form className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="Razorpay"
              onChange={handlePaymentChange}
              className="form-radio"
            />
            <span>Razorpay</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              onChange={handlePaymentChange}
              className="form-radio"
            />
            <span>Cash on Delivery</span>
          </label>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
        <ul>
          {updatedCart?.map((item) => (
            <li key={item.product.productId._id}>
              {item.product.productId.name} - ₹{item.product.productId.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Discount ({discountRate}%): -₹{discount.toFixed(2)}</p>
        <p>GST ({gstRate}%): ₹{gst.toFixed(2)}</p>
        <p className="font-semibold">Total: ₹{total.toFixed(2)}</p>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={paymentLoader==true}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          
          { paymentLoader==true ? <LoaderPopUpOpen text={"Please Wait..."}/>:"Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
