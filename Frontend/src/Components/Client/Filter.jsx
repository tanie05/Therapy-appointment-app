import { Button } from "@mui/material";
import React from "react";
import DropDown from "../../Molecules/DropDown";
import { useState, useEffect } from "react";
import useFilter from "../../Hooks/filterHooks";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { filter, page, userData } from "../../Redux/Slices/admin";
import { animateScroll as scroll } from "react-scroll";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";

const Filter = ({ handleApi, handleSectionScroll }) => {
  // console.log(handleApi);
  const [toggle, setToggle] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const url = "http://localhost:5000/therapy";

  const [searchParams, setSearchParams] = useSearchParams({
    email: "",
    status: "",
  });

  const [status, setStatus] = useState("");

  const handleEmail = (e) => {
    // setEmail(e.target.value);
    // setIsFiltering((val) => !val);
    setSearchParams(
      (prev) => {
        prev.set("email", e.target.value);
        console.log(searchParams.get("email"));
        return prev;
      },
      { replace: true }
    );
  };

  const handleAccessCode = (data) => {
    console.log("in handle access", data);
    let val;
    if (data !== "all") val = "";
    else val = data;

    setSearchParams(
      (prev) => {
        prev.set("status", val);
        return prev;
      },
      { replace: true }
    );
    setStatus(val);
    console.log(searchParams.get("status"), val);
    setIsFiltering((val) => !val);
  };

  const handleClick = async () => {
    const result = await handleApi(
      true,
      url +
        `?page=0&email=${searchParams.get(
          "email"
        )}&accessCode=${searchParams.get("status")}`
    );
    return result;
  };

  const handleBtnClick = async (e) => {
    setIsFiltering((val) => !val);
  };

  const handleRemoveFilter = async (e) => {
    setSearchParams((prev) => {
      prev.set("email", "");
      prev.set("status", "");
      return prev;
    });

    setStatus("");

    setIsFiltering((val) => !val);
  };

  const resetEmail = () => {
    setSearchParams((prev) => {
      prev.set("email", "");
      return prev;
    });
    setIsFiltering((val) => !val);
  };

  useEffect(() => {
    const handle = async () => {
      const result = await handleClick();
      // console.log(result);
      // dispatch(userData(result.data));
    };

    handle();
  }, [isFiltering]);

  // useEffect(() => {
  //   setIsFiltering((val) => !val);
  // }, [access]);

  const list = ["pending", "completed", "booked", "cancelled", "all"];
  const colorObj = {
    pending: "#009fffa6",
    completed: "green",
    booked: "gray",
    cancelled: "red",
    all: "black",
  };
  return (
    <div id="filterContainer">
      <div className="filterField" id="inputField">
        <input
          value={searchParams.get("email")}
          onChange={handleEmail}
          id="in"
          type="text"
          placeholder="Search Users By Email"
        />
        <SearchIcon
          id="search"
          className="filterBtn button"
          onClick={handleBtnClick}
        />

        <CloseIcon
          id="reset"
          className="filterBtn button"
          onClick={resetEmail}
        />
      </div>
      <div className="filterField" id="dropDownField">
        <div className="label">
          <span>Status</span>
        </div>
        <div className="selectField">
          <div id="statusText" style={{ color: colorObj[status] }}>
            {status.length
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "All Status"}
          </div>

          <ArrowDropDownIcon
            className="button"
            onClick={() => setToggle((val) => !val)}
          ></ArrowDropDownIcon>
          {toggle && (
            <DropDown
              list={list}
              setAccess={handleAccessCode}
              setToggle={setToggle}
            />
          )}
        </div>
      </div>

      <div className="filterField" id="removeFilter">
        <RemoveCircleOutlineIcon
          className="button"
          id="removeFilterBtn"
          onClick={handleRemoveFilter}
        ></RemoveCircleOutlineIcon>
      </div>
    </div>
  );
};

export default Filter;
