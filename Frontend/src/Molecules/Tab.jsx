import React from "react";
import "./tab.css";

const Tab = ({ email, status, language }) => {
  return (
    <div id="tabContainer">
      <div className="common" id="email">
        {email}
      </div>
      <div className="common" id="status">
        {status}
      </div>
      <div className="common" id="language">
        {language}
      </div>
    </div>
  );
};

export default Tab;
