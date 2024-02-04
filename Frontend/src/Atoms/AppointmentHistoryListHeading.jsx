import React from "react";

const AppointmentHistoryListHeading = () => {
  return (
    <>
      <li className="historyListItem">
        <div className="historyListAttribute">Description</div>
        <div className="historyListAttribute">Language</div>
        <div className="historyListAttribute">Timing</div>
        <div className="historyListAttribute">Phone</div>
        <div className="historyListAttribute">Status</div>
      </li>
    </>
  );
};

export default AppointmentHistoryListHeading;
