import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";
import "../Pages/AppointmentHistoryPage/AppointmentHistoryPage.css";

const AppointmentHistorySidebar = (props) => {
  const { setFunction } = props;
  const [btnSelect, setBtnSelect] = useState({
    allBtn: true,
    pendingBtn: false,
    bookedBtn: false,
    completedBtn: false,
    cancelledBtn: false,
  });

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
          <Typography style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>
            Status
          </Typography>
          <ul className="sidebarUl">
            <li
              style={{
                border: `${btnSelect.allBtn ? "2px solid #ff705b" : "none"}`,
              }}
            >
              <Button
                id="allBtn"
                style={{
                  color: "#ff705b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
                variant="text"
                value="all"
                onClick={onClick}
              >
                All
              </Button>
            </li>
            <li
              style={{
                border: `${
                  btnSelect.pendingBtn ? "2px solid #ff705b" : "none"
                }`,
              }}
            >
              <Button
                id="pendingBtn"
                style={{
                  color: "#ff705b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
                variant="text"
                value="pending"
                onClick={onClick}
              >
                Pending
              </Button>
            </li>
            <li
              style={{
                border: `${btnSelect.bookedBtn ? "2px solid #ff705b" : "none"}`,
              }}
            >
              <Button
                id="bookedBtn"
                style={{
                  color: "#ff705b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
                variant="text"
                value="booked"
                onClick={onClick}
              >
                Booked
              </Button>
            </li>
            <li
              style={{
                border: `${
                  btnSelect.completedBtn ? "2px solid #ff705b" : "none"
                }`,
              }}
            >
              <Button
                id="completedBtn"
                style={{
                  color: "#ff705b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
                variant="text"
                value="completed"
                onClick={onClick}
              >
                Completed
              </Button>
            </li>
            <li
              style={{
                border: `${
                  btnSelect.cancelledBtn ? "2px solid #ff705b" : "none"
                }`,
              }}
            >
              <Button
                id="cancelledBtn"
                style={{
                  color: "#ff705b",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                }}
                variant="text"
                value="cancelled"
                onClick={onClick}
              >
                Cancelled
              </Button>
            </li>
          </ul>
        </div>
        <div
          style={{
            border: "1px solid #fc9383",
            margin: "0px 0px 0px 10px",
            width: "2px",
            height: "100vh",
            backgroundColor: "#fc9383",
          }}
        />
      </div>
    </>
  );
};

export default AppointmentHistorySidebar;
