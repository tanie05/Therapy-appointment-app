import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";

export const PrivateRotuerUser = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  // console.log("auth -> ", auth);
  // if()
  return auth && auth.isLoggedIn && auth.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export const PrivateRotuerAdmin = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  // console.log(auth && auth.isLoggedIn === true && auth.role === "admin");

  return auth && auth.isLoggedIn === true && auth.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
