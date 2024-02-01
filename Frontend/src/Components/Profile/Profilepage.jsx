import React, { useEffect, useState } from "react";
import "./Profilepage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { Navbar } from "../Navbar/Navbar";

// useEffect(() => {}, []);

const Profilepage = () => {
  const id = "65b748134b758584546d78dd";
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Langauge: "",
    DOB: "",
  });
  //const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjc0ODEzNGI3NTg1ODQ1NDZkNzhkZCIsImlhdCI6MTcwNjY4NzY4NSwiZXhwIjoxNzA2NjkxMjg1fQ.SZ_J5p2Vx9T6luq3Dw9uGEptqctaPiVjIYFL8vkgPR4";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userdata = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(userdata.data);
        if (userdata) {
          setUserData(userdata.data);
        }
      } catch (err) {
        console.log("error while fetching user:", err.message);
      }
    };
    fetchdata();
  }, []);

  const handleInputChange = (field) => (event) => {
    setUserData({
      ...userData,
      [field]: event.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:5000/users/${id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update user data");
      }
      setIsEditing(false);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };
  return (
    <div className="Parentcontainer">
      <Navbar/>
      <div className="container">
        <form className="login-form">
          <PersonIcon style={{ fontSize: "10rem" }} />
          <h1>User Profile</h1>
          <input
            type="text"
            id="fname"
            name="Firstname"
            value={userData.Firstname}
            onChange={handleInputChange("Firstname")}
            disabled={!isEditing}
            placeholder="FirstName"
          />
          <input
            type="text"
            id="lname"
            name="Lastname"
            value={userData.Lastname}
            disabled={!isEditing}
            onChange={handleInputChange("Lastname")}
            placeholder="Lastname"
          />
          <input
            type="Email"
            id="email"
            name="email"
            value={userData.Email}
            onChange={handleInputChange("Email")}
            disabled={!isEditing}
            placeholder="Email"
          />
          <input
            type="Language"
            id="lanaguage"
            value={userData.Langauge}
            name="Langauge"
            onChange={handleInputChange("Langauge")}
            disabled={!isEditing}
            placeholder="Langauge"
          />
          <input
            type="date"
            id="dob"
            name="DOB"
            value={userData.DOB}
            onChange={handleInputChange("DOB")}
            disabled={!isEditing}
            placeholder="DOB"
          />

          <div className="buttoncontainer">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setIsEditing((val) => !val);
              }}
              style={{ backgroundColor: "#008CBA" }}
            >
              Edit
            </button>
            <button onClick={handlesubmit} type="button" className="btn1">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profilepage;
