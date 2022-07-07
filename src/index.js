import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Routing from "./Routing/Routing";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter style={{ position: "relative" }}>
      <Header />
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
