import React from "react";

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
    </div>
  );
}
