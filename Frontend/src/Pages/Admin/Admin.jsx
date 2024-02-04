import React from "react";
import SidePane from "../../Components/Sidepane/SidePane";
import { Button } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Client from "../../Components/Client/Client";
import "./admin.css";
import { Navbar } from "../../Components/Navbar/Navbar";

const Admin = () => {
  return (
    <div id="adminContainer">
      <Navbar />
      <SidePane />
      <Client />
    </div>
  );
};

export default Admin;
