import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/userInfo";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo);
  const isLoggedIn = user.isLoggedIn;
  const role = user.role;
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <div className="nav-link-list">
      <Link to={"/"} className="nav-items">Home</Link>
      {role === "user" && (
        <>
          <Link to={"/profile"} className="nav-items" >Profile</Link>
          <Link to={"/history"} className="nav-items" >History</Link>
        </>
      )}
      </div>
      <LogoutIcon onClick={handleLogOut} className="logout-icon nav-items"/>
      
    </div>
  );
};
