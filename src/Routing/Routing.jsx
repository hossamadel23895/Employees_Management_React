import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import NotFound from "../components/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";
import Users from "../components/Users";

export default function Routing() {
  return (
    <>
      <div style={{ paddingTop: "100px", minHeight:"100vh"}}>
        <Routes>
          <Route path="" element={<Home />}>
            <Route index element={<Navigate to="/login" />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
