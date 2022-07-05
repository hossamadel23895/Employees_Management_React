import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { Button, Card } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex h1">User Details</div>
      <div className="d-flex h4">
        Username : {JSON.parse(localStorage.getItem("userData")).name || ""}
      </div>
      <div className="d-flex h4">
        Email : {JSON.parse(localStorage.getItem("userData")).email || ""}
      </div>
      <div className="d-flex h4">
        Role : {JSON.parse(localStorage.getItem("userData")).role || ""}
      </div>
    </div>
  );
}