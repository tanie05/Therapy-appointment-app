import React, { useEffect, useState } from "react";
import "./Profilepage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCircleUser } from "react-icons/fa6";
import { Checkmark } from "react-checkmark";
import { Navbar } from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { editName } from "../../Redux/Slices/userInfo";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import { validateDateOfBirth, validateName } from "../../../util";

const Profilepage = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo._id;
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const [userData, setUserData] = useState({
    name: {
      firstname: "",
      lastname: "",
    },
    email: "",
    language: "",
    DOB: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userdata = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (userdata) {
          setUserData(userdata.data);
        }
      } catch (err) {
        seterror("connection error");
        // console.log("error while fetching user:", err.message);
      }
    };
    fetchdata();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    seterror("");

    if (name === "firstname" || name === "lastname") {
      setUserData((prevState) => ({
        ...prevState,
        name: {
          ...prevState.name,
          [name]: value,
        },
      }));
    } else {
      setUserData((prevfield) => ({
        ...prevfield,
        [name]: value,
      }));
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!userData.name.firstname || !userData.name.lastname || !userData.DOB) {
      seterror("Please Enter All Field");
      return;
    }
    if (
      !validateName(userData.name.firstname) ||
      !validateName(userData.name.lastname)
    ) {
      seterror("Please Enter a correct name");
      return;
    }
    if (!validateDateOfBirth(userData.DOB)) {
      seterror("Please enter valid age");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing((val) => !val);
      if (response.status !== 200) {
        throw new Error("Failed to update user data");
      }
      toast.success("Profile Updated", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispatch(editName(userData.name));
    } catch (error) {
      seterror(`Some error occured:${error.message}`);
      console.error("Error updating user data:", error.message);
    }
  };
  return (
    <div className="Parentprofilecontainer">
      <div className="container1">
        <div className="img">
          <FaCircleUser style={{ fontSize: "7rem", margin: "1rem" }} />
          <h1>
            {userInfo.name.firstname} {userInfo.name.lastname}
          </h1>
        </div>

        <div className="textfield">
          <div className="logindiv">
            <Typography style={{ fontSize: "0.8rem" }}>First Name</Typography>
            <input
              className="profileContainerInput"
              style={{ marginRight: "0.25rem" }}
              type="text"
              name="firstname"
              disabled={!isEditing}
              value={userData.name.firstname}
              maxLength={30}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="logindiv">
            <Typography style={{ fontSize: "0.8rem" }}>LastName</Typography>
            <input
              className="profileContainerInput"
              style={{ marginRight: "0.25rem" }}
              type="text"
              name="lastname"
              value={userData.name.lastname}
              disabled={!isEditing}
              onChange={handleInputChange}
              maxLength={30}
              required
            />
          </div>
        </div>
        <div className="profileContainerParent">
          <Typography style={{ fontSize: "0.8rem" }}>Email</Typography>
          <input
            className="profileContainerInput"
            style={{ marginRight: "0.5rem" }}
            type="text"
            name="email"
            value={userData.email}
            maxLength={30}
            onChange={handleInputChange}
            readOnly
            placeholder="Enter email"
            required
          />
        </div>
        <div className="profileContainerParent">
          <Typography style={{ fontSize: "0.8rem" }}>Language</Typography>
          <select
            className="profileContainerInput "
            onChange={handleInputChange}
            value={userData.language}
            name="language"
            maxLength={30}
            disabled={!isEditing}
            id="cars"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
        <div className="profileContainerParent">
          <Typography style={{ fontSize: "0.8rem" }}>DOB</Typography>
          <input
            className="profileContainerInput"
            style={{ marginRight: "0.25rem" }}
            type="date"
            value={userData.DOB}
            name="DOB"
            disabled={!isEditing}
            onChange={handleInputChange}
            maxLength={30}
            placeholder="Enter DOB"
            required
          />
        </div>
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            ‼️ {error}
          </p>
        )}
        <div className="buttoncontainer">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setIsEditing((val) => !val);
            }}
            style={{ backgroundColor: !isEditing ? "#008CBA" : "#ADD8E6" }}
          >
            Edit
          </button>
          <button onClick={handlesubmit} type="button" className="btn1">
            Save
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profilepage;
