import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/HomePage/Home";
import Profilepage from "./Pages/Profile/Profilepage";
import { useSelector } from "react-redux";
import Admin from "./Pages/Admin/Admin";
import SignUp from "./Pages/SignupPage/SignUp";
import AppointmentHistoryPage from "./Pages/AppointmentHistoryPage/AppointmentHistoryPage";
import "./app.css";
import { PrivateRotuerAdmin, PrivateRotuerUser } from "./PrivateRoutes";
import { Navbar } from "./Components/Navbar/Navbar";
import NavWrapper from "./Components/NavWrapper/NavWrapper";
function App() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NavWrapper />}>
            <Route element={<PrivateRotuerUser />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profilepage />}></Route>
              <Route
                path="/history"
                element={<AppointmentHistoryPage />}
              ></Route>
            </Route>
          </Route>
          <Route element={<NavWrapper />}>
            <Route element={<PrivateRotuerAdmin />}>
              <Route path="/admin" element={<Admin />}></Route>
            </Route>
          </Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
