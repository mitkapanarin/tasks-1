import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const PrivateRoute = () => {
  const token = useSelector((state) => state.user.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
