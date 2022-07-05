import React, { Component } from "react";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <h1
        className={style.navabarStyle}
      >
        This is Public Content that doesn't require login
      </h1>
    </div>
  );
}
