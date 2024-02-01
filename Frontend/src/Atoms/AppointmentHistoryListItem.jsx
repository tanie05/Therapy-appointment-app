import React from "react";

const AppointmentHistoryListItem = () => {
  return (
    <>
      <li
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0.1rem 0 0.1rem 0",
          width: "100%",
          border: "2px solid #ff705b",
          borderRadius: "0.5rem",
          marginBottom: "0.4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
            marginLeft: "0.2rem",
            alignItems: "center",
          }}
        >
          <p>Lorem ipsum dolor sit amet consectet...</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
            alignItems: "center",
          }}
        >
          English
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
            alignItems: "center",
          }}
        >
          09:33PM, 23-03-23
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
            alignItems: "center",
          }}
        >
          +91 12344567890
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
            alignItems: "center",
            fontWeight: "700",
          }}
        >
          Pending
        </div>
      </li>
    </>
  );
};

export default AppointmentHistoryListItem;
