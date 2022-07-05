import React, { useState } from "react";
import axios from "axios";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  function getUser(e) {
    let userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
  }

  async function formSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(user));

    await axios
      .post("http://localhost:8000/api/login", user)
      .then((response) => {
        if (response.data.data) {
          let userData = response.data.data;
          userData.token = response.data.data.token.access_token;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        return response.data;
      })
      .then(
        () => {
          window.location.href = "/dashboard";
        },
        (error) => {
          console.log(error.response.data.message);
          let errorMsg = error.response.data.message;
          setMessage(errorMsg);
        }
      );
  }

  return (
    <div className="h-100">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <form className="w-50" onSubmit={formSubmit}>
          <div
            className="d-flex justify-content-center text-white h3"
          >
            Welcome to MR Modeling Services Website
          </div>
          <div className="d-flex justify-content-center text-white h3">
            Please login to continue
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              onChange={getUser}
              type="email"
              className="form-control"
              name="email"
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Your Password
            </label>
            <input
              onChange={getUser}
              type="password"
              className="form-control"
              name="password"
            ></input>
          </div>
          <div className="d-flex d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
