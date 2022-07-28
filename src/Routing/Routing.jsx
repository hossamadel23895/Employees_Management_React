import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Profile from "../components/Auth/Profile";
import NotFound from "../components/ErrorPages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";
import ListUsers from "../components/Users/ListUsers";
import Vacations from "../components/Vacations/Vacations";
import ShowForRole from "./ShowForRole";
import VacationRequests from "../components/VacationRequests/VacationRequests";

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
            <Route
              path="users"
              element={
                <ShowForRole role="admin">
                  <ListUsers />
                </ShowForRole>
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="users/:userId/vacations" element={<Vacations />} />
            <Route path="users/:userId/requests" element={<VacationRequests />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
