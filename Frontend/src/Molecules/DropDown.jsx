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
              {text}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DropDown;
