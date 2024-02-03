import React from "react";
import { Button } from "@mui/material";
import "./dropdown.css";

const DropDown = ({ list, setAccess, setToggle, handleClick }) => {
  return (
    <div id="dropDownContainer">
      {list.map((text, index) => {
        return (
          <div key={index} className="dropDownField">
            <button
              onClick={(e) => {
                setAccess(text);
                setToggle(false);
              }}
              className="dropDownBtn"
            >
              {text.charAt(0).toUpperCase() + text.slice(1)}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DropDown;
