import React from "react";
import Filter from "./Filter";
import Tab from "../../Molecules/Tab";
import "./client.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userData, page, errorText, total } from "../../Redux/Slices/admin";
import axios from "axios";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Snackbar, TextField } from "@mui/material";

const Client = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // const [status, setStatus] = useState(admin.userData.status);

  // const [page, setPage] = useState(0);
  // let page = 0;
  const url = `http://localhost:5000/therapy`;

  const handleSnackClose = () => {
    setOpenSnack((val) => !val);
    dispatch(err);
  };

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result, "in handle");
      if (refresh) {
        dispatch(userData(result.data.data));
        dispatch(total(result.data.total));
      } else {
        if (result.data.data && result.data.data.length) {
          dispatch(userData(result.data.data));
          console.log(result.data.total);
          dispatch(total(result.data.total));
        }

        // setStatus(admin.userData.status);
      }
      setError("");
      return result.data;
    } catch (err) {
      if (err.name === "AxiosError") {
        console.log("hi", err);

        if (!err) setError("Unknown error occurred!");
        else setError(err.response.data.message);
        // dispatch(errorText(err.response.data.message));
      } else setError(err.message);

      // dispatch(errorText(error));
      setOpenSnack(true);
    }
  };

  return (
    <div className="homeContainer">
      <Snackbar
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={3000}
        message={error}
        className="snackbar"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        color="orange"
      />
      <Filter handleApi={handle} />

      <div id="tabHeading">
        <div className="totalRecord">Total Records: {admin.total}</div>
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
        {
          <div className="errorHandle">
            {" "}
            {!error.length
              ? !admin.userData.length
                ? "No Records Found"
                : ""
              : error}{" "}
          </div>
        }
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
