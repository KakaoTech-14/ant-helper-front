import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, []);

  const login = () => setSignedIn(true);
  const logout = () => {
    setSignedIn(false);
    sessionStorage.removeItem("accessToken"); // 로그아웃 시 토큰 삭제
  };

  return (
    <AuthContext.Provider value={{ signedIn, login, logout }}>
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
