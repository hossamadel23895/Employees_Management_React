import React from "react";
import { Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import NotFound from "../components/NotFound";
import NotLoggedIn from "../components/NotLoggedIn";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";

export default function Routing() {
  return (
    <>
      <div style={{ paddingTop: "50px", height: "100vh" }}>
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
