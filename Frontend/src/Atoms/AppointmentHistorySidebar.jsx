import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "7rem",
          position: "fixed",
          flex: "none",
        }}
        id="leftPart"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>
            Status
          </Typography>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1.2rem",
              margin: "0rem",
              padding: "0rem",
              listStyleType: "none",
            }}
          >
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
                  //   backgroundColor: `${btnSelect.all && "#000000"}`,
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
            border: "1px solid #ff705b",
            margin: "0px 0px 0px 10px",
            width: "2px",
            height: "100vh",
            backgroundColor: "#ff705b",
          }}
        />
      </div>
    </>
  );
};

export default AppointmentHistorySidebar;
