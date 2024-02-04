import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { isClose } from "../Redux/Slices/admin";
// import { ViewSidebarIcon } from "@mui/icons-material/ViewSidebar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const PaneHeader = ({ heading }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(isClose(false));
  };
  return (
    <div id="paneHeader">
      <span>{heading}</span>
      <Button
        style={{
          borderStyle: "none",
          color: "orange",
        }}
        variant="outlined"
        disableElevation
        onClick={handleClick}
      >
        <ArrowBackIosNewIcon />
      </Button>
    </div>
  );
};

export default PaneHeader;
