import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Home from "./Pages/HomePage/Home";
import Profilepage from "./Components/Profile/Profilepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/profile" element={<Profilepage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
