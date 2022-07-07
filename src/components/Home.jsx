import * as React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div
        className="d-flex ms-auto justify-content-center align-items-center h-100 flex-column"
        style={{ left: "270px" }}
      >
        <Outlet />
      </div>
    </>
  );
}
