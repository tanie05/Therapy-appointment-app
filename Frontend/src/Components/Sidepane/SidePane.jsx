// SidePane.js
import React from "react";
import { useState } from "react";
import PaneButtonList from "../../Molecules/PaneButtonList";
import PaneHeader from "../../Molecules/PaneHeader";
import "./sidePane.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { isClose } from "../../Redux/Slices/admin";
import MenuIcon from "@mui/icons-material/Menu";

const SidePane = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    dispatch(isClose(true));
  };

  return (
    <>
      {admin.isClose ? (
        <div className="container">
          <PaneHeader heading={""} />
          <PaneButtonList />
        </div>
      ) : (
        <div id="sideBtnContainer">
          <MenuIcon
            variant="outlined"
            style={{
              fontSize: "200%",
              position: "sticky",
              top: 0,
              bottom: 0,
              color: "orange",
              // backgroundColor: "#0698f6",
            }}
            onClick={handleOnClick}
          ></MenuIcon>
        </div>
      )}
    </>
  );
};

export default SidePane;
