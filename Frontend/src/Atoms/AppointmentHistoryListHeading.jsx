import React from "react";

const AppointmentHistoryListHeading = () => {
  return (
    <>
      <li
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0.5rem 0 0.5rem 0",
          width: "100%",
          border: "3px solid #fc9383",
          borderRadius: "0.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          Description
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          Language
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          Timing
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          Phone
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "20%",
          }}
        >
          Status
        </div>
      </li>
    </>
  );
};

export default AppointmentHistoryListHeading;
