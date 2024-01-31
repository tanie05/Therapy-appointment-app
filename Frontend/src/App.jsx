import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Profilepage from "./Components/Profile/Profilepage";
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
          {/* <Route
            element={
              isLoggedIn ? (
                role === "admin" ? (
                  <Admin />
                ) : role === "user" ? (
                  <Home />
                ) : null
              ) : (
                <Home/>
              )
            }
            path="/"
          /> */}

          <Route path="/" element={<Home/>} ></Route>  
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/admin" element = {<Admin/>}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/profile" element={<Profilepage />}></Route>
        </Routes>
      </Router>
    </div>)
}
export default App;
