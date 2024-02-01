import { Button } from "@mui/material";
import React from "react";
import DropDown from "../../Molecules/DropDown";
import { useState, useEffect } from "react";
import useFilter from "../../Hooks/filterHooks";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { filter, page, userData } from "../../Redux/Slices/admin";

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
    setAccessCode(data);
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
      dispatch(userData(result.data));
    };

    handle();
  }, [isFiltering]);

  useEffect(() => {
    setIsFiltering((val) => !val);
  }, [access]);

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
        <input
          value={email}
          onChange={handleEmail}
          id="in"
          type="text"
          placeholder="Search Users By Email"
        />
        <button id="search" className="filterBtn btn" onClick={handleBtnClick}>
          Search
        </button>
        <button id="reset" className="filterBtn btn" onClick={resetEmail}>
          Reset
        </button>
      </div>
      <div className="filterField" id="dropDownField">
        <div className="label">
          <span>Status Code</span>
        </div>
        <div className="selectField">
          <div>{access.length ? access : "All Status"}</div>

          <button className="btn" onClick={() => setToggle((val) => !val)}>
            ^
          </button>
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
        <button className="btn" onClick={handleRemoveFilter}>
          {"Remove Filters"}
        </button>
      </div>
    </div>
  );
};

export default Filter;
