import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";

const ProtectedAdminRoute = ({ children }) => {
  const { role } = useAppContext(); // Assume `user` contains user data including role

  if (!role || role !== "Admin") {
    return <Navigate to="/login" />; // Redirect if not an admin
  }else{
    <Navigate to="/"/>
  }

  return children; // Render the child components if admin
};

export default ProtectedAdminRoute;
