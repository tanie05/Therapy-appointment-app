import React from "react";
import AppointmentHistoryListHeading from "../Atoms/AppointmentHistoryListHeading";
import AppointmentHistoryListItem from "../Atoms/AppointmentHistoryListItem";

const AppointmentHistoryList = (props) => {
  return (
    <>
      <ul className="historyListParent">
        <AppointmentHistoryListHeading />

        {props.data.map((obj) => {
          return <AppointmentHistoryListItem key={obj._id} data={obj} />;
        })}
      </ul>
    </>
  );
};

export default AppointmentHistoryList;
