<<<<<<< HEAD
import Home from "./Pages/HomePage/Home";
import Admin from "./Pages/Admin/Admin";
import { Navbar } from "./Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
  const role = useSelector((state) => state.userInfo.role);

  return (
    <div>
      <Router>
        <Routes>
          
          <Route
            element={
              isLoggedIn ? (
                role === "admin" ? (
                  <Admin />
                ) : role === "user" ? (
                  <Home />
                ) : null
              ) : (
                <Home/>
                // <Login />  
              )
            }
            path="/"
          />

        </Routes>
      </Router>
    </div>
=======
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Homepage from "./Pages/Homepage/Homepage";
import Profilepage from "./Components/Profile/Profilepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/profile" element={<Profilepage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
>>>>>>> origin/arun1
  );
}

export default App;
