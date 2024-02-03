import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
export const PrivateRotuerUser = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  // console.log(auth);
  // console.log(auth.isLoggedIn, auth.role);
  // console.log(auth.isLoggedIn && auth.role === "user");

  // if()
  return auth.isLoggedIn && auth.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export const PrivateRotuerAdmin = () => {
  const auth = JSON.parse(localStorage.getItem("user"));

  return auth.isLoggedIn && auth.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
