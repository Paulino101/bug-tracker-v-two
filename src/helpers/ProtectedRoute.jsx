import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthContext } from "./Context";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuth, setIsAuth } = useContext(isAuthContext);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
