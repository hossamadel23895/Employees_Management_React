import * as React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
