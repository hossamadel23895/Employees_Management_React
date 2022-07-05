import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Tasks from "../components/Tasks/Tasks";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import Header from "./Header";

export default function Routing() {
  const [userData, setUserData] = useState(null);
  return (
    <>
      <Header />
      <div style={{ paddingTop: "50px", height: "100vh" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}
