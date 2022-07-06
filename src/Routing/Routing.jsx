import React from "react";
import { Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "../components/Home";
import Login from "../components/Login";
import Tasks from "../components/Tasks";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import NotFound from "../components/NotFound";
import AboutUs from "../components/AboutUs";
import NotLoggedIn from "../components/NotLoggedIn";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import ContactUs from "../components/ContactUs";
import ProtectedRoute from "./ProtectedRoute";

export default function Routing() {
  return (
    <>
      <div style={{ paddingTop: "50px", height: "100vh" }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
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
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/not-logged-in" element={<NotLoggedIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
