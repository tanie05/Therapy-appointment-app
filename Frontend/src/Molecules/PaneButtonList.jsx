import React from "react";
import PaneButton from "../Atoms/PaneButton";
import { useDispatch, useSelector } from "react-redux";

const PaneButtonList = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin.paneList);
  return (
    <div id="listContainer">
      {admin.paneList.map((text, index) => {
        return <PaneButton text={text} />;
        // <button>{text}</button>;
      })}
    </div>
  );
};

export default PaneButtonList;
