import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate, useLocation } from "react-router-dom";

import "./ReactMinimalSideNavigation.css";

export default function NavSidebar() {
  const style = {
    sidebar: {
      width: "250px",
      position: "fixed",
      height: "100vh",
      backgroundColor: "black",
      top: "0px",
    },
  };

  const navigate = useNavigate();
  const location = useLocation();
  let userId = JSON.parse(localStorage.getItem("userData")).id;
  let userRole = JSON.parse(localStorage.getItem("userData")).role.name;
  let managingRoles = ["admin", "leader_1", "leader_2"];

  // Creating NavBar items list
  let navItems = [];

  navItems.push({
    title: "Dashboard",
    itemId: "/dashboard",
  });

  if (managingRoles.includes(userRole)) {
    navItems.push({
      title: "Users",
      itemId: "/users",
    });
  }

  navItems.push({
    title: "My Vacation Requests",
    itemId: `/users/${userId}/requests`,
  });

  navItems.push({
    title: "My Vacations",
    itemId: `/users/${userId}/vacations`,
  });

  return (
    <React.Fragment>
      {/* Sidebar */}
      <div
        style={style.sidebar}
        className="bg-dark py-5 my-4 fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 border-r-2 lg:translate-x-0 lg:static lg:inset-0 ease-out translate-x-0"
      >
        <div className="flex items-center justify-center text-center pt-4 pb-4 text-light">
          <span className="mx-2 text-2xl font-semibold">
            {JSON.parse(localStorage.getItem("userData")).email}
          </span>
        </div>

        <Navigation
          style={{ backgroundColor: "red" }}
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            if (!itemId.includes("submenu")) {
              navigate(itemId);
            }
          }}
          items={navItems}
        />
      </div>
    </React.Fragment>
  );
}
