import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";

const AppointmentHistorySidebar = (props) => {
  const [btnSelect, setBtnSelect] = useState({
    allBtn: true,
    pendingBtn: false,
    bookedBtn: false,
    completedBtn: false,
    cancelledBtn: false,
  });

  const { setFunction } = props;

  const muiBtnStyle = (flag) => {
    return {
      fontWeight: "700",
      fontSize: "1rem",
      width: "100%",
      backgroundColor: flag ? "#ff705b" : "#ffffff",
      color: flag ? "#ffffff" : "#ff705b",
      marginBottom: "0.3rem",
    };
  };

  useEffect(() => {
    setFunction(props.defaultValue);
  }, []);

  const onClick = (e) => {
    setFunction(e.target.value);
    const obj = Object.keys(btnSelect).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    obj[e.target.id] = true;
    setBtnSelect(obj);
  };

  return (
    <>
      <div className="historySidebarParent" id="leftPart">
        <div className="historySidebar">
          <Typography
            style={{
              fontSize: "1.5rem",
              marginBottom: "0rem",
              width: "100%",
              textAlign: "center",
              fontWeight: "700",
              marginTop: "1rem",
            }}
          >
            Status
          </Typography>
          <ul className="sidebarList">
            <li style={{ width: "100%" }}>
              <Button
                id="allBtn"
                style={muiBtnStyle(btnSelect.allBtn)}
                variant="text"
                value="all"
                onClick={onClick}
              >
                All
              </Button>
            </li>
            <li style={{ width: "100%" }}>
              <Button
                id="pendingBtn"
                style={muiBtnStyle(btnSelect.pendingBtn)}
                variant="text"
                value="pending"
                onClick={onClick}
              >
                Pending
              </Button>
            </li>
            <li style={{ width: "100%" }}>
              <Button
                id="bookedBtn"
                style={muiBtnStyle(btnSelect.bookedBtn)}
                variant="text"
                value="booked"
                onClick={onClick}
              >
                Booked
              </Button>
            </li>
            <li style={{ width: "100%" }}>
              <Button
                id="completedBtn"
                style={muiBtnStyle(btnSelect.completedBtn)}
                variant="text"
                value="completed"
                onClick={onClick}
              >
                Completed
              </Button>
            </li>
            <li style={{ width: "100%" }}>
              <Button
                id="cancelledBtn"
                style={muiBtnStyle(btnSelect.cancelledBtn)}
                variant="text"
                value="cancelled"
                onClick={onClick}
              >
                Cancelled
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AppointmentHistorySidebar;
