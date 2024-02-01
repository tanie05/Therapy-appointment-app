import { Button } from "@mui/material";
import React from "react";
import DropDown from "../../Molecules/DropDown";
import "./filter.css";

const Filter = () => {
  const list = [
    "pending",
    "completed",
    "booked",
    "ongoing",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
  ];
  return (
    <div id="filterContainer">
      <div className="filterField" id="inputField">
        <input id="in" type="text" placeholder="Search Users By Email" />
        <button id="search" className="filterBtn">
          Search
        </button>
        <button id="reset" className="filterBtn">
          Reset
        </button>
      </div>
      {/* <div className="filterField" id="dropDownField">
        <DropDown list={list} />
      </div> */}

      <div className="filterField" id="removeFilter">
        <button> Remove Filters </button>
      </div>
    </div>
  );
};

export default Filter;
