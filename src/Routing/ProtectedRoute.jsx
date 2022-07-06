import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("userData")) {
    // user is not logged in
    return <Navigate to="/not-logged-in" />;
  }
  return children;
}
