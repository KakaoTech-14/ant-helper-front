import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const ACCESS_TOKEN_KEY = 'accessToken';
  const EMAIL_KEY = 'email';

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const email = sessionStorage.getItem(EMAIL_KEY); // 이메일 정보를 세션에서 가져옴

    if (token && email) {
      setSignedIn(true);
      setUserInfo({ email });
    } else {
      setSignedIn(false);
      setUserInfo(null);
    }
  }, []);

  const login = (email) => {
    sessionStorage.setItem(EMAIL_KEY, email);
    setSignedIn(true);
    setUserInfo({ email });
  };

  const logout = () => {
    setSignedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
  };

  return (
    <AuthContext.Provider value={{ signedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅. AuthProvider에 전달한 value를 쉽게 사용하게 해줌
export const useAuth = () => useContext(AuthContext);
