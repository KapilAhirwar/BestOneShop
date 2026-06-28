import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../useContextHook/context';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isUser } = useAppContext(); // If using context or useSelector for Redux
  if(!isUser) return <Navigate to="/" />
  return element;
};

export default ProtectedRoute;
