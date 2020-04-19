import React from "react";
import logo from "./loader.png";
import "./loader.css";

function Loader() {
  return (
    <div className="logo-container">
      <img src={logo} className="logo" />
    </div>
  );
}

export default Loader;
