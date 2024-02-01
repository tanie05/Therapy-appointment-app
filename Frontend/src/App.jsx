import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Home from "./Pages/HomePage/Home";
import Profilepage from "./Components/Profile/Profilepage";
import { useSelector } from "react-redux";
import Admin from "./Pages/Admin/Admin";

function App() {
  const userInfo = useSelector((state) => state.userInfo);
  // console.log(userInfo);
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          {userInfo.isLoggedIn && userInfo.role === "admin" && (
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
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route path="/" element={<LoginPage />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
