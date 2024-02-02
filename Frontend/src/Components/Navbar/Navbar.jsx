import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slices/userInfo";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import "./navbar.css";
import { Button } from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo);
  const isLoggedIn = user.isLoggedIn;
  const role = user.role;
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    dispatch(logout(false));
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <div className="nav-link-list">
        <Link to={"/"} className="nav-items">
          Home
        </Link>
        {role === "user" && (
          <>
            <Link to={"/profile"} className="nav-items">
              {user.name.firstname}
              {"   "}
              {user.name.lastname}
            </Link>
            <Link to={"/history"} className="nav-items">
              History
            </Link>
          </>
        )}
        <Button
          // style={{ height: "0.2vh", width: "0.1vw" }}
          onClick={handleLogOut}
          className="logout-icon nav-items"
        >
          <LogoutIcon />
        </Button>
      </div>
    </div>
  );
};
