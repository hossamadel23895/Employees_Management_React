import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import Routing from './Routing/Routing';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
