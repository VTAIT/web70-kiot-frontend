import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import Register from "../../pages/Register";

const PrivateRoute = ({ component: Component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  if (isAuthenticated) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
