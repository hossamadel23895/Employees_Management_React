import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

export default function Header(props) {
  const logoutUser = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <>
      <div className={style.navabarStyle}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to={"/home"}>
              MR Modeling Services
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav d-flex justify-content-between w-100">
                <div className="d-flex">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={"/home"}
                    >
                      Home
                    </NavLink>
                  </li>

                  {localStorage.getItem("userData") ? (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={"/dashboard"}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={"/profile"}
                        >
                          Profile
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {localStorage.getItem("userData") ? (
                  <div className="d-flex">
                    <li className="d-flex align-items-center text-light">
                      <div className="text-light">
                        Welcome :{" "}
                        {JSON.parse(localStorage.getItem("userData")).email ||
                          ""}
                      </div>
                    </li>
                    <li className="nav-item px-2">
                      <a
                        onClick={logoutUser}
                        className="nav-link btn btn-danger"
                        href="/login"
                      >
                        Logout
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="d-flex">
                    <li className="nav-item px-2">
                      <NavLink
                        className="nav-link btn btn-success"
                        to={"/login"}
                      >
                        Login
                      </NavLink>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
