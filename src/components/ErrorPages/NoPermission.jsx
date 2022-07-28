import React from "react";
import { NavLink } from "react-router-dom";

export default function NoPermission() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <h1>You don't have permissions to access this page</h1>
      <NavLink className="btn btn-primary" to="/dashboard">
        Go To Dashboard
      </NavLink>
    </div>
  );
}
