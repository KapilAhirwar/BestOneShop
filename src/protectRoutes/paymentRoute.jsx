import React from "react";
import Home from "../pages/Home";
import { useRozerpay } from "../Payment/RozerpayHook";

const PaymentRoute = ({ children }) => {
  const { pay } = useRozerpay(); // Assume `user` contains user data including role
    // console.log("pay ",pay);
  if (!pay) {
    return <Home to="/" />; // Redirect if not an admin
  }

  return children; // Render the child components if admin
};

export default PaymentRoute;
