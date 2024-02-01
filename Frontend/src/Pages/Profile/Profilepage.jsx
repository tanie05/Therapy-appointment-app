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

const Profilepage = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo._id;
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
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
        console.log("error while fetching user:", err.message);
      }
    };
    fetchdata();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevfield) => ({
      name: {
        ...prevfield.name,
        [name]: value,
      },
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
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
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(editName(userData.name));
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  return (
    <div className="Parentprofilecontainer">
      <Navbar />
      <div className="container1">
        <form className="login-form">
          <div className="img">
            <FaCircleUser style={{ fontSize: "5rem" }} />
            <h1>My Profile</h1>
          </div>

          <div className="format">
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="inputfield"
              value={userData.name.firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="FirstName"
              maxlength="20"
            />
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="inputfield"
              value={userData.name.lastname}
              disabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Lastname"
              maxlength="20"
            />
          </div>
          <input
            type="Email"
            id="email"
            name="email"
            value={userData.email}
            readOnly
            placeholder="Email"
            maxlength="20"
          />
          <input
            type="text"
            id="langauge"
            value={userData.language}
            name="langauge"
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Langauge"
            maxlength="20"
          />
          <input
            type="date"
            id="dob"
            name="DOB"
            value={userData.DOB}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="DOB"
            maxlength="20"
          />

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
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
