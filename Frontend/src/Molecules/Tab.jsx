import React from "react";
import "./tab.css";

const Tab = ({ email, status, language }) => {
  console.log(
    status,
    language,
    status.charAt(0).toUpperCase() + status.slice(1)
  );

  return (
    <div id="tabContainer">
      <div className="common" id="email">
        {email}
      </div>
      <div className="common" id="status">
        {status !== undefined
          ? status.charAt(0).toUpperCase() + status.slice(1)
          : ""}
      </div>
      <div className="common" id="language">
        {language !== undefined
          ? language.charAt(0).toUpperCase() + language.slice(1)
          : ""}
      </div>
    </div>
  );
};

export default Tab;
