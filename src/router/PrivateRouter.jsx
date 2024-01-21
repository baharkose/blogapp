import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();
  // const user = false;
  return currentUser ? <Outlet /> : <Navigate to="auth" />;
};

export default PrivateRouter;
