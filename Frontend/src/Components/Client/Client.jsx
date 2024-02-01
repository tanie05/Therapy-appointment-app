import React from "react";
import Filter from "./Filter";
import Tab from "../../Molecules/Tab";
import "./client.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userData, page } from "../../Redux/Slices/admin";
import axios from "axios";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Client = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  // const [status, setStatus] = useState(admin.userData.status);

  // const [page, setPage] = useState(0);
  // let page = 0;
  const url = `http://localhost:5000/therapy`;

  const handleClick = async (e) => {
    console.log("here", e.target.name);
    switch (e.target.name) {
      case "prev": {
        if (admin.page === 0) return;

        await handle(
          false,
          url +
            `?page=${admin.page - 1}&email=${admin.filter.email}&accessCode=${
              admin.filter.access
            }`
        );
        // setPage((val) => val - 1);
        dispatch(page(admin.page - 1));
        break;
      }
      case "next": {
        // page += 1;

        console.log(admin.page, url + `?page=${admin.page + 1}`);
        console.log(admin.filter);
        const result = await handle(
          false,
          url +
            `?page=${admin.page + 1}&email=${admin.filter.email}&accessCode=${
              admin.filter.access
            }`
        );
        if (result.data.length) {
          console.log("hee");
          // setPage((val) => val + 1);
          dispatch(page(admin.page + 1));
        }
      }
    }
  };

  const handle = async (refresh, url) => {
    console.log(url);
    try {
      const result = await axios.get(
        url,

        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(result);
      if (refresh) {
        dispatch(userData(result.data));
      } else {
        dispatch(userData(result.data.length ? result.data : admin.userData));
        // setStatus(admin.userData.status);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   handle(true, url);
  //   return () => {
  //     dispatch(userData([]));
  //   };
  // }, []);
  return (
    <div className="homeContainer">
      <Filter handleApi={handle} />
      <div id="tabHeading">
        {/* <Tab email={"User"} status={"Status"} language={"Language"} /> */}
        <div id="user">User</div>
        <div id="status">Status</div>
        <div id="language">Language</div>
      </div>
      <div id="list">
        {admin.userData.map((data, index) => {
          return (
            <Tab
              id={data._id}
              key={index}
              email={data.email}
              status={data.status}
              language={data.language}
              handleApi={handle}
            />
          );
        })}
      </div>
      <div id="pageSelection">
        <button
          type="button"
          name="prev"
          className="page"
          onClick={handleClick}
        >
          {/* <ArrowBackIosNewIcon /> */}
          {"<"}
        </button>

        <button
          type="button"
          name="next"
          className="page"
          onClick={handleClick}
        >
          {/* <ArrowForwardIosIcon /> */}
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Client;
