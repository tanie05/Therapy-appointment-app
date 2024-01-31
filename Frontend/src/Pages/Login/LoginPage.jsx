import React, { useState } from "react";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import "./Login.css";
const LoginPage = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    const rawdata = new FormData(e.target);
    const data = Object.fromEntries(rawdata.entries());

    try {
      const userdata = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      console.log(userdata);
      if (userdata) {
        const token = userdata.data.token;
        console.log(token);
        localStorage.setItem("token", token);

        navigate("/homepage");
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
    <div className="Parentcontainer">
      <div className="container">
        <form className="login-form" onSubmit={handlelogin}>
          <h1>Login</h1>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="UserEmail"
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
            required
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
    </div>
  );
};

export default LoginPage;
