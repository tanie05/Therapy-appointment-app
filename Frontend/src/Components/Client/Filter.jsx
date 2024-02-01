import { Button } from "@mui/material";
import React from "react";
import DropDown from "../../Molecules/DropDown";
import { useState, useEffect } from "react";
import useFilter from "../../Hooks/filterHooks";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { filter, page, userData } from "../../Redux/Slices/admin";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Filter = ({ handleApi }) => {
  // console.log(handleApi);
  const [toggle, setToggle] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const url = "http://localhost:5000/therapy";
  const dispatch = useDispatch();

  const {
    email,
    setEmail,
    accessCode: access,
    setAccessCode,
    // handleAccessCode,
  } = useFilter(url, handleApi);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // setIsFiltering((val) => !val);
  };

  const handleAccessCode = (data) => {
    if (data !== "all") setAccessCode(data);
    else setAccessCode("");
    // setIsFiltering((val) => !val);
  };

  const handleClick = async (access) => {
    const result = await handleApi(
      false,
      url + `?page=0&email=${email}&accessCode=${access}`
    );
    return result;
  };

  const handleBtnClick = async (e) => {
    setIsFiltering((val) => !val);
  };

  const handleRemoveFilter = async (e) => {
    console.log("in remove");
    setEmail("");
    setAccessCode("");

    setIsFiltering((val) => !val);
  };

  const resetEmail = () => {
    setEmail("");
    setIsFiltering((val) => !val);
  };

  useEffect(() => {
    console.log("here", access);

    dispatch(
      filter({
        email,
        access,
      })
    );
    dispatch(page(0));
    const handle = async () => {
      const result = await handleClick(access);
      console.log(result);
      dispatch(userData(result.data));
    };

    handle();
  }, [isFiltering]);

  useEffect(() => {
    setIsFiltering((val) => !val);
  }, [access]);

  const list = ["pending", "completed", "booked", "cancelled", "all"];
  return (
    <div id="filterContainer">
      <div className="filterField" id="inputField">
        <input
          value={email}
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
          <div id="statusText">
            {access.length
              ? access.charAt(0).toUpperCase() + access.slice(1)
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
