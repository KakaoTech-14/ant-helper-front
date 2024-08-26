import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Settings from "./pages/Settings";

import "./App.css";

//Home, Signin, Signup, Mypage
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/settings/*" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
