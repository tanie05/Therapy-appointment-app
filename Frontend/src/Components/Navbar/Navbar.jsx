import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../Redux/Slices/userInfo";
import {Link} from "react-router-dom";

export const Navbar = () => {

  const isLoggedIn = useSelector(state => state.userInfo.isLoggedIn);
  const role = useSelector(state => state.userInfo.role);
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(logout);
  };
  

  return (
    <div className="nav-container">

        {
            isLoggedIn &&

            role === "user" ? 
            <div>
            <Link to= "/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/history">History</Link>
            </div> :
            <Link to = "/">Home</Link>

            &&

            <button onClick={handleLogOut} >Logout</button>
        }
        
        {
        
        }
        

        

    </div>
  )
}
