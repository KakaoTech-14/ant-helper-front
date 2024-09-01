import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute, { AuthProvider } from "./Auth";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CodeInfo from "./components/CodeInfo";
import Account from "./pages/Account";
import AITrade from "./pages/AITrade";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/codeInfo" element={<CodeInfo />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-trade"
            element={
              <ProtectedRoute>
                <AITrade />
              </ProtectedRoute>
            }
          />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
