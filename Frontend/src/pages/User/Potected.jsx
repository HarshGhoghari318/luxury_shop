import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import  AuthContext from "../../utils/Auth.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
