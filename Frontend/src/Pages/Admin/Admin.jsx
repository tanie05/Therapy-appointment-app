import React from "react";

import SidePane from "../../Components/Sidepane/SidePane";
import { Button } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Client from "../../Components/Client/Client";
import "./admin.css";

const Admin = () => {
  return (
    <Router>
      <div id="adminContainer">
        <SidePane />
        <Routes>
          <Route path="/" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Admin;
