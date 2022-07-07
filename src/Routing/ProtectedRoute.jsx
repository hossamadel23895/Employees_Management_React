import React from "react";
import NotLoggedIn from "../components/NotLoggedIn";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("userData")) {
    // user is not logged in
    return <NotLoggedIn />;
  }
  return children;
}
