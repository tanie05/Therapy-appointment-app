import React from "react";
import AppointmentHistoryListHeading from "../Atoms/AppointmentHistoryListHeading";
import AppointmentHistoryListItem from "../Atoms/AppointmentHistoryListItem";

const AppointmentHistoryList = () => {
  let list = [1, 2, 3, 4, 5];
  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0.5rem",
          alignItems: "center",
          padding: "0rem",
          listStyleType: "none",
        }}
      >
        <AppointmentHistoryListHeading />

        {/* Dynamically add the type of appointments */}
        {list.map((i) => {
          return <AppointmentHistoryListItem key={i} />;
        })}
      </ul>
    </>
  );
};

export default AppointmentHistoryList;
