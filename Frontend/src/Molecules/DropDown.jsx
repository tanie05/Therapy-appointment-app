import React from "react";
import { Button } from "@mui/material";
import "./dropdown.css";

const DropDown = ({ list }) => {
  return (
    <div id="dropDownContainer">
      <div className="dropDownField">
        {list.map((text, index) => {
          return (
            <Button
              style={{ fontSize: "2vh", padding: "0px", width: "90%" }}
              key={index}
            >
              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
