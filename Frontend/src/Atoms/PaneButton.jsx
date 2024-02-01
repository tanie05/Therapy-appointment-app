import { Button } from "@mui/material";
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const PaneButton = ({ text }) => {
  console.log("text", text);
  return (
    <div className="paneButtonField">
      <Button
        className="paneButton"
        variant="primary"
        size="medium"
        disablePadding
      >
        <div className="paneButton">
          <PersonOutlineIcon />
          <div>{text}</div>
        </div>
      </Button>
    </div>
  );
};

export default PaneButton;
