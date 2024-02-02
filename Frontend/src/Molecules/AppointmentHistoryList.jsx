import React from "react";
import AppointmentHistoryListHeading from "../Atoms/AppointmentHistoryListHeading";
import AppointmentHistoryListItem from "../Atoms/AppointmentHistoryListItem";

const AppointmentHistoryList = (props) => {
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

        {props.data.map((obj) => {
          return <AppointmentHistoryListItem key={obj._id} data={obj} />;
        })}
      </ul>
    </>
  );
};

export default AppointmentHistoryList;
