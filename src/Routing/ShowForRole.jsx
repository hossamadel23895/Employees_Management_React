import * as React from "react";
import { Navigate } from "react-router-dom";
import NoPermission from "../components/ErrorPages/NoPermission";

export default function ShowForRole(props) {
  let userRole = JSON.parse(localStorage.getItem("userData")).role.name;
  let requiredRole = props.role;
  if (userRole === requiredRole) {
    return props.children;
  } else {
    return <NoPermission />;
  }
}
