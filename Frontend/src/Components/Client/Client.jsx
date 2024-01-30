import React from "react";
import Filter from "./Filter";
import Tab from "../../Molecules/Tab";
import "./client.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userData } from "../../Redux/Slices/admin";
import axios from "axios";

const Client = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const url = "http://localhost:5000/therapy/";
  useEffect(() => {
    const handle = async () => {
      try {
        const result = await axios.get(url, {
          header: {
            "Content-Type": "application/json",
          },
        });
        console.log(result);
        dispatch(userData([...admin.userData, result.data[0]]));
      } catch (err) {
        console.log(err);
      }
    };
    handle();
  }, []);
  return (
    <div className="homeContainer">
      <Filter />
      {admin.userData.map((data, index) => {
        return (
          <Tab
            email={data.email}
            status={data.status}
            language={data.language}
          />
        );
      })}
    </div>
  );
};

export default Client;
