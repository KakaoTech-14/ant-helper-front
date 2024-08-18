import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

export default Navbar;

//  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
