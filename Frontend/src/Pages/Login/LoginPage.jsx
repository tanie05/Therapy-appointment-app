import React, { useState } from "react";
import { login } from "../../Redux/Slices/userInfo";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateEmail from "../../../util";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";

import "./Login.css";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    const data = Object.fromEntries(rawdata.entries());

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const userdata = await axios.post(
        `http://localhost:5000/auth/login`,
        data
      );

      if (userdata) {
        const token = userdata.data.token;
        localStorage.setItem("token", token);

        const userInfo = userdata.data.user;
        const storeUser = {
          isLoggedIn: true,
          _id: userInfo._id,
          name: userInfo.name,
          role: userInfo.role,
        };
        localStorage.setItem("user", JSON.stringify(storeUser));

        dispatch(login(storeUser));
        if (userInfo.role === "admin") navigate("/admin");
        else navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(`${err.response.data.message}`);
      //setError(err.response.data.message);
    }
  };

  const handleEmailChange = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const redirecttosignup = () => {
    navigate("/signup");
  };

  return (
    <div className="Parentlogincontainer">
      {error && (
        <div id="errorContainer">
          <Alert
            severity="error"
            style={{
              backgroundColor: "#fff",
              color: "black",
              boxShadow: "0 0 0 5px #fcf4f4 inset",
              borderRadius: "1vw",
            }}
          >
            <AlertTitle style={{ fontSize: "20px", color: "#c40000" }}>
              There was a problem
            </AlertTitle>
            {error}
          </Alert>
        </div>
      )}
      <div className="containerlogin">
        <form onSubmit={handlelogin}>
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            value={email}
            placeholder=" UserEmail"
            onChange={handleEmailChange}
            required
            minlength="4"
            maxlength="30"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
            required
            minlength="6"
            maxlength="15"
          />
          <p style={{ color: "rgb(37, 58, 214)" }}>Forgot Password?</p>
          <button type="submit" className="btn3 ">
            Login
          </button>
          <p className="login-message ">
            Not a member? <span onClick={redirecttosignup}>Sign up</span>
          </p>
        </form>
      </div>
      <ToastContainer
        position="top-center"
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

export default LoginPage;
