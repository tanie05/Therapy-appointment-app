import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./navwrapper.css";

const NavWrapper = () => {
  return (
    <div id="navWrapperContainer">
      <Navbar /> {/* Render the Navbar outside of the Routes */}
      <Outlet /> {/* Render the content of the current route here */}
    </div>
  );
};

export default NavWrapper;
