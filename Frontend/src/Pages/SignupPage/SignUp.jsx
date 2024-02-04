import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Dropdown from "../../Atoms/Dropdown";
import { Typography } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [language, setLanguage] = useState("english");

  const clearErrors = () => {
    setErrors({});
  };

  const passwordMatch = (p1, p2) => {
    return p1 === p2;
  };

  const validateDOB = (date) => {
    const dob = new Date(date);
    const todaydate = new Date();
    return dob <= todaydate;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const details = Object.fromEntries(formData.entries());
    details.language = language;

    if (!passwordMatch(details.password, details.confirmpassword)) {
      setErrors({
        ...errors,
        confirmpassword: "Passwords do not match",
      });
      return;
    }

    if (!validateDOB(details.DOB)) {
      setErrors({
        ...errors,
        DOB: "Invalid date of birth",
      });
      return;
    }

    //add user to db
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/signup`,
        details
      );
      clearErrors();
      navigate("/");
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.response.data.message,
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="signupParentContainer">
        <div className="signupContainer">
          <form onSubmit={onSubmit}>
            {/* <h1>Therapy Appointments</h1> */}
            <h1 style={{ fontSize: "2rem" }}>Sign Up</h1>

            <div className="flexRowAlign">
              <div className="signupContainerParent">
                <Typography
                  style={{ textAlign: "initial", fontSize: "0.7rem" }}
                >
                  First Name
                </Typography>
                <input
                  className="signupContainerInput"
                  style={{ marginRight: "0.25rem" }}
                  type="text"
                  name="firstname"
                  maxLength={100}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div className="signupContainerParent">
                <Typography
                  style={{ textAlign: "initial", fontSize: "0.7rem" }}
                >
                  Last Name
                </Typography>
                <input
                  className="signupContainerInput"
                  style={{ marginLeft: "0.25rem" }}
                  type="text"
                  name="lastname"
                  maxLength={100}
                  placeholder="Enter Last Name"
                  onChange={clearErrors}
                />
              </div>
            </div>
            <div className="signupContainerParent">
              <Typography style={{ textAlign: "initial", fontSize: "0.7rem" }}>
                E-mail
              </Typography>
              <input
                className="signupContainerInput"
                type="email"
                name="email"
                maxLength={300}
                placeholder="Enter E-mail"
                onChange={clearErrors}
                required
              />
            </div>

            <div className="languageContainer">
              <div style={{ marginTop: "1rem" }}>
                <Dropdown
                  name="Language"
                  entries={[
                    { display: "English", value: "english" },
                    { display: "Spanish", value: "spanish" },
                  ]}
                  defaultValue="english"
                  setFunction={setLanguage}
                />
              </div>

              <div className="birthDateContainer">
                <Typography
                  style={{ textAlign: "initial", fontSize: "0.7rem" }}
                >
                  Date of Birth
                </Typography>
                <input
                  style={{ height: "2rem", width: "10rem" }}
                  type="date"
                  name="DOB"
                  onFocus={clearErrors}
                  required
                />
              </div>
            </div>

            <div className="signupContainerParent">
              <Typography style={{ textAlign: "initial", fontSize: "0.7rem" }}>
                Password
              </Typography>
              <input
                className="signupContainerInput"
                type="password"
                name="password"
                onChange={clearErrors}
                required
                minLength={6}
                pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9\s]).+"
                placeholder="Enter Password"
              />
            </div>

            <div className="signupContainerParent">
              <Typography
                style={{
                  textAlign: "initial",
                  fontSize: "0.7rem",
                }}
              >
                Confirm Password
              </Typography>
              <input
                className="signupContainerInput"
                type="password"
                name="confirmpassword"
                onChange={clearErrors}
                required
                placeholder="Confirm Password"
              />
            </div>

            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.9rem",
              }}
            >
              Password should contain lowercase letters, uppercase letters,
              integers and special characters
            </p>

            <button type="submit" className="btnhover signupbtn3">
              Sign Up
            </button>

            <p className="signup-message">
              Already a member?{" "}
              <button
                style={{ fontSize: "1.2rem" }}
                className="btnhover"
                type="none"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log In
              </button>
            </p>
          </form>
          <span className="errordisplay">
            {errors.confirmpassword}
            {errors.submit}
            {errors.DOB}
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
