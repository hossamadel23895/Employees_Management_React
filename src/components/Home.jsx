import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <h1 className="my-2">MR Modeling Services</h1>
      <h3 className="my-2">Premium Quality Modeling Services</h3>
      <NavLink to="/services" className="btn btn-success my-2">Read More</NavLink>
    </div>
  );
}
