import React from "react";
import AppointmentHistoryList from "../../Molecules/AppointmentHistoryList";
import Dropdown from "../../Atoms/Dropdown";

const RightPart = () => {
  return (
    <>
      <div style={{ marginLeft: "7rem", flex: "1" }}>
        <div style={{ width: "100%" }} id="rightPart">
          {/* Heading */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Appointments</h1>
          </div>
          {/* All filters and sort dropdowns */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Dropdown
              name="Language"
              entries={[
                { display: "All", value: "all" },
                { display: "English", value: "english" },
                { display: "Spanish", value: "spanish" },
              ]}
              defaultValue="all"
            />
            <Dropdown
              name="Sort by:"
              entries={[
                { display: "Submit date, recent", value: "recentsubmit" },
                { display: "Submit date, oldest", value: "oldestsubmit" },
              ]}
              defaultValue="recentsubmit"
            />
          </div>

          <AppointmentHistoryList />
        </div>
      </div>
    </>
  );
};

export default RightPart;
