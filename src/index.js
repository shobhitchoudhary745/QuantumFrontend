import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Component from "./Component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<App />} />
        <Route exact path={"/component"} element={<Component />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
