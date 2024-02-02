import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Dropdown from "../../Atoms/Dropdown";

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
          <form className="login-form" onSubmit={onSubmit}>
            {/* <h1>Therapy Appointments</h1> */}
            <h2>Sign Up</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                style={{ marginRight: "0.25rem" }}
                type="text"
                name="firstname"
                maxLength={100}
                placeholder="Enter First Name"
                required
              />

              <input
                style={{ marginLeft: "0.25rem" }}
                type="text"
                name="lastname"
                maxLength={100}
                placeholder="Enter Last Name"
                onChange={clearErrors}
              />
            </div>

            <input
              type="email"
              name="email"
              maxLength={300}
              placeholder="Enter E-mail"
              onChange={clearErrors}
              required
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
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

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <label style={{ fontSize: "0.875rem" }} htmlFor="DOB">
                  Birth Date:{" "}
                </label>
                <input type="date" name="DOB" onFocus={clearErrors} required />
              </div>
            </div>

            <input
              type="password"
              name="password"
              onChange={clearErrors}
              required
              minLength={6}
              pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9\s]).+"
              placeholder="Enter Password"
            />

            <input
              type="password"
              name="confirmpassword"
              onChange={clearErrors}
              required
              placeholder="Confirm Password"
            />

            <p>
              Password should contain lowercase letters, uppercase letters,
              integers and special characters
            </p>

            <button type="submit" className="btnhover signupbtn3">
              Sign Up
            </button>

            <p className="login-message">
              Already a member?{" "}
              <button
                className="btnhover"
                type="none"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
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
