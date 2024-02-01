import React, { useState } from "react";
import { login } from "../../Redux/Slices/userInfo";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

const LoginPage = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    const data = Object.fromEntries(rawdata.entries());

    try {
      const userdata = await axios.post(
        "http://localhost:5000/auth/login",
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

        toast.success("Login successful", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch(login(storeUser));
        if (userInfo.role === "admin") navigate("/admin");
        else navigate("/");
      }
    } catch (err) {
      setError("Wrong Password or Email");
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
      <div className="containerlogin">
        <form className="login-form" onSubmit={handlelogin}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="UserEmail"
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
            maxlength="30"
          />
          <p style={{ color: "rgb(37, 58, 214)" }}>Forgot Password?</p>
          <button type="submit" className="btn3">
            Login
          </button>
          <p className="login-message">
            Not a member? <span onClick={redirecttosignup}>Sign up</span>
          </p>
        </form>
        <span style={{ color: "red", padding: "5rem", fontSize: "1.5rem" }}>
          {error}
        </span>
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
