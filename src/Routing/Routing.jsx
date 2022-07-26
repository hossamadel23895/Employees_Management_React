import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import NotFound from "../components/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";
import ListUsers from "../components/Users/ListUsers";
import Vacations from "../components/Vacations/Vacations";

export default function Routing() {
  return (
    <>
      <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/login" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<ListUsers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users/:userId/vacations" element={<Vacations />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
