import React, { useEffect, useState } from "react";
import "./tab.css";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { page, userData } from "../Redux/Slices/admin";
import axios from "axios";

// import DropDownMenu from "material-ui/DropDownMenu";
// import Select from "@material-ui/core/Select";

const lst = ["booked", "pending", "completed", "cancelled"];

const Tab = ({ email, status, language, id, handleApi }) => {
  const [toggle, setToggle] = useState(false);
  // const [statusState, setStatusState] = useState(status);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const token = localStorage.getItem("token");
  
  const url = "http://localhost:5000/therapy/";

  const handleDropDownClick = async (data) => {
    try {
      const result = await axios.put(
        url + `${id}`,
        { status: data },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result);

      // dispatch(page(0));
      const res = await handleApi(
        false,
        url +
          `?page=0&email=${admin.filter.email}&accessCode=${admin.filter.access}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   handleClick({ status: status });
  // }, [statusState]);

  return (
    <div id="tabContainer">
      <div className="common" id="email">
        {email}
      </div>
      <div className="common" id="status">
        <div id="statusButtonField">
          <Button
            id="statusButton"
            onClick={() => setToggle((val) => !val)}
            disabled={status !== "pending"}
          >
            <span>
              {status !== undefined
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : ""}
            </span>
            <span>
              <ArrowDropDownIcon />
            </span>
          </Button>
          {toggle && (
            <DropDown
              list={lst}
              setToggle={setToggle}
              setAccess={handleDropDownClick}
            />
          )}
        </div>
      </div>
      <div className="common" id="language">
        <div>
          {language !== undefined
            ? language.charAt(0).toUpperCase() + language.slice(1)
            : ""}
        </div>
        {/* <DropDownMenu /> */}
      </div>
    </div>
  );
};

export default Tab;
