import * as React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Layout/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div
        className="w-75 mx-4"
        style={{ left: "250px", position: "relative" }}
      >
        <Outlet />
      </div>
    </>
  );
}
