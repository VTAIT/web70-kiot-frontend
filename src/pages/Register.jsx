import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <div>Register</div>;
};

export default Register;
