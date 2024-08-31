import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email"); // 이메일 정보를 세션에서 가져옴
    if (token && email) {
      setSignedIn(true);
      setUserInfo({ email });
    } else {
      setSignedIn(false);
      setUserInfo(null);
    }
  }, []);

  const login = (email) => {
    sessionStorage.setItem("email", email);
    setSignedIn(true);
    setUserInfo({ email });
  };

  const logout = () => {
    setSignedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ signedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
