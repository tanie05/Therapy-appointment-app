import { Button } from "@mui/material";
import React from "react";

const PaneButton = ({ text }) => {
  console.log("text", text);
  return (
    <div className="paneButton">
      <Button variant="primary" size="medium" disablePadding>
        {text}
      </Button>
    </div>
  );
};

export default PaneButton;
