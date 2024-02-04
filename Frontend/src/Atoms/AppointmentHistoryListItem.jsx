import React from "react";
import { formatDate, limitLetters } from "../Utils/Utils";

const AppointmentHistoryListItem = (props) => {
  const data = props.data;
  return (
    <>
      <li
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0.1rem 0 0.1rem 0",
          width: "100%",
          height: "2rem",
          boxShadow: "2px 2px 4px 2px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
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
          <p>{limitLetters(data.description, 40)}</p>
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
          {data.language}
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
          {formatDate(data.timings[0])}
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
          {data.phone.countryCode + " " + data.phone.number}
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
          {data.status}
        </div>
      </li>
    </>
  );
};

export default AppointmentHistoryListItem;
