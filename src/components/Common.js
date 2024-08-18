//styled-components는 CSS-in-JS 방식으로 스타일을 작성할 수 있는 라이브러리
//CSS를 별도의 파일이 아닌 자바스크립트 파일 내에서 직접 작성할 수 있으며, 각 스타일이 특정 컴포넌트에만 적용되도록 모듈화
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
//   width: 100%;
// `;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  justify-items: center;
  overflow-x: hidden;
`;
export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
`;
export const Input = styled.input`
  font-size: 20px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  &::placeholder {
    color: darkgrey;
    font-size: 20px;
    font-weight: 500;
    font-family: "Goorm Sans";
  }
`;

export const Form = styled.div`
  display: flex;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 15px;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
`;

const SearchBar = styled.input`
  padding: 8px;
  border-radius: 20px;
  border: 1px solid #ddd;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserIcon = styled.div`
  margin-left: 20px;
  cursor: pointer;
  font-size: 20px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  display: ${(props) => (props.show ? "block" : "none")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: black;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUserIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <NavbarWrapper>
      <Logo>Ant Helper</Logo>
      <NavLinks>
        <Link to="/">홈</Link>
        <Link to="/account">내 계좌</Link>
        <Link to="/ai-trade">AI 거래</Link>
        <SearchBar type="text" placeholder="검색" />
        {loggedIn ? (
          <UserMenu>
            <UserIcon onClick={handleUserIconClick}>🔔</UserIcon>
            <UserIcon onClick={handleUserIconClick}>👤</UserIcon>
            <DropdownMenu show={dropdownOpen}>
              <div>(사용자명)</div>
              <Link to="/settings">설정</Link>
              <Link to="/logout">로그아웃</Link>
            </DropdownMenu>
          </UserMenu>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </NavLinks>
    </NavbarWrapper>
  );
};

//  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
