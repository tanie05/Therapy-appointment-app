import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Home from "./Pages/HomePage/Home";
import Profilepage from "./Components/Profile/Profilepage";
import { useSelector } from "react-redux";
import Admin from "./Pages/Admin/Admin";
import "./app.css";
import { PrivateRotuerAdmin, PrivateRotuerUser } from "./PrivateRoutes";
import { Navbar } from "./Components/Navbar/Navbar";
import NavWrapper from "./Components/NavWrapper/NavWrapper";
function App() {
  const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavWrapper />}>
            <Route element={<PrivateRotuerUser />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profilepage />}></Route>
            </Route>
          </Route>
          <Route element={<NavWrapper />}>
            <Route element={<PrivateRotuerAdmin />}>
              <Route path="/admin" element={<Admin />}></Route>
            </Route>
          </Route>

          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          {/* {userInfo.isLoggedIn && userInfo.role === "admin" && (
            <Route path="/" element={<Admin />}></Route>
          )}

          {userInfo.isLoggedIn && userInfo.role === "user" && (
            <>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profilepage />}></Route>
            </>
          )}

          {userInfo.isLoggedIn === false && (
            <>
            </>
          )} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
