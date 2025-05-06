import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, isAdmin }) {
  const isAuthenticated = localStorage.getItem("user_id");
  const userIsAdmin = localStorage.getItem("is_admin") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !userIsAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}