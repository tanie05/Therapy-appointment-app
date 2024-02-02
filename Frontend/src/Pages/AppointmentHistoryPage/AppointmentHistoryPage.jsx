import React, { useEffect, useState } from "react";
import AppointmentHistorySidebar from "../../Atoms/AppointmentHistorySidebar";
import AppointmentHistoryList from "../../Molecules/AppointmentHistoryList";
import Dropdown from "../../Atoms/Dropdown";
import "./AppointmentHistoryPage.css";
import "@fontsource/roboto/400.css";
import { Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const AppointmentHistoryPage = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo._id;
  const token = localStorage.getItem("token");
  const pageSize = 5;

  //data stored
  const [data, setData] = useState([]);

  //inital render flag
  const [initialRender, setInitalRender] = useState(true);

  //filters and sorters
  const [status, setStatus] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("recentsubmit");

  //page number
  const [pageNum, setPageNum] = useState(1);

  //error message
  const [errorMsg, setErrorMsg] = useState("");

  const onClickNext = async () => {
    if (data.length >= pageSize) {
      const newPageVal = pageNum + 1;
      await getData(newPageVal);
    }
  };

  const onClickPrev = async () => {
    if (pageNum > 1) {
      const newPageVal = pageNum - 1;
      await getData(newPageVal);
    }
  };

  //filter use effect
  useEffect(() => {
    if (initialRender) {
      setInitalRender(false);
    } else {
      getData(1);
    }
  }, [status, language]);

  useEffect(() => {
    getData(1);
  }, [sort]);

  const getData = async (page) => {
    setErrorMsg("");

    //get request to fetch data
    try {
      const params = {};

      params.status = status;

      params.language = language;

      if (sort === "recentsubmit") {
        params.sort = "createdAt";
        params.sortValue = "-1";
      }
      if (sort === "oldestsubmit") {
        params.sort = "createdAt";
        params.sortValue = "1";
      }

      params.pageNum = page;
      setPageNum(page);

      const response = await axios.get(
        //Use ID from redux
        `http://localhost:5000/users/history/${id}?status=${params.status}&language=${params.language}&sort=${params.sort}&sortValue=${params.sortValue}&pageNum=${params.pageNum}`, //Add id manually for now
        { params: params, headers: { authorization: `Bearer ${token}` } }
      );

      setData(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flexRow">
        <AppointmentHistorySidebar defaultValue="all" setFunction={setStatus} />

        <div className="rightParentContainer">
          <div className="rightContainer" id="rightPart">
            <div className="historyHeading">
              <Typography style={{ fontSize: "2rem" }}>
                Appointments History
              </Typography>
            </div>

            <div className="filtersContainer">
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

            <AppointmentHistoryList data={data} />

            <div className="navBtnContainer">
              <div style={{ margin: "1rem" }}>
                <Button
                  id="PrvButton"
                  style={{
                    color: "#ff705b",
                    fontWeight: "700",
                    fontSize: "0.8rem",
                  }}
                  variant="text"
                  value="all"
                  onClick={onClickPrev}
                  disabled={pageNum === 1}
                >
                  Prev
                </Button>
              </div>

              <div style={{ margin: "1rem" }}>
                <Button
                  id="NxtButton"
                  style={{
                    color: "#ff705b",
                    fontWeight: "700",
                    fontSize: "0.8rem",
                  }}
                  variant="text"
                  value="all"
                  onClick={onClickNext}
                  disabled={data.length < pageSize}
                >
                  Next
                </Button>
              </div>
            </div>

            <p className="errorMsg">{errorMsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentHistoryPage;
