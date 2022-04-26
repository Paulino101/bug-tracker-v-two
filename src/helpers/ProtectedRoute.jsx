import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthContext } from "./Context";

function ProtectedRoute() {
  const { isAuth, setIsAuth } = useContext(isAuthContext);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
