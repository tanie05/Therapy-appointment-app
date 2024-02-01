import React, { useEffect, useState } from "react";
import AppointmentHistorySidebar from "../../Atoms/AppointmentHistorySidebar";
import AppointmentHistoryList from "../../Molecules/AppointmentHistoryList";
import Dropdown from "../../Atoms/Dropdown";
import "./AppointmentHistoryPage.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";

const AppointmentHistoryPage = () => {
  const [status, setStatus] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("recentsubmit");
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    // console.log(status);
  }, [status]);

  useEffect(() => {
    // console.log(language);
  }, [language]);

  useEffect(() => {
    // console.log(sort);
  }, [sort]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <AppointmentHistorySidebar defaultValue="all" setFunction={setStatus} />
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
              <Typography style={{ fontSize: "2rem" }}>
                Appointments History
              </Typography>
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
                setFunction={setLanguage}
              />
              <Dropdown
                name="Sort by:"
                entries={[
                  { display: "Submit date, recent", value: "recentsubmit" },
                  { display: "Submit date, oldest", value: "oldestsubmit" },
                ]}
                defaultValue="recentsubmit"
                setFunction={setSort}
              />
            </div>

            <AppointmentHistoryList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentHistoryPage;
