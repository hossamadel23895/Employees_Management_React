import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Urls from "../../Routing/Urls";

export default function Login() {
  const navigate = useNavigate();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      return navigate("/dashboard");
    }
  }, []);

  function getUser(e) {
    let userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
  }

  async function formSubmit(e) {
    e.preventDefault();
    await axios
      .post(`${Urls.mainUrl}/login`, user)
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
          let errorMsg = error.response.data.message;
          setErrMessage(errorMsg);
        }
      );
  }

  return (
    <div style={{ height: "80vh" }}>
      <div className="container d-flex justify-content-center align-items-center h-100 flex-column">
        <div className="d-flex justify-content-center text-white h1 mb-5">
          Welcome to MR Management website
        </div>
        <form className="w-50" onSubmit={formSubmit}>
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
          {errMessage && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {errMessage}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
