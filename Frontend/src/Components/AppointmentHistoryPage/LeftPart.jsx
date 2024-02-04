import React from "react";

const LeftPart = () => {
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
          <h2 style={{ marginBottom: "2rem" }}>History</h2>
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
            <li style={{ marginBottom: "1rem" }}>All</li>
            <li style={{ marginBottom: "1rem" }}>Pending</li>
            <li style={{ marginBottom: "1rem" }}>Booked</li>
            <li style={{ marginBottom: "1rem" }}>Completed</li>
            <li style={{ marginBottom: "1rem" }}>Cancelled</li>
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

export default LeftPart;
