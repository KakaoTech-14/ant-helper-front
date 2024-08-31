import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth";
import { ReactComponent as NotificationIcon } from "../assets/icons/notifications.svg";
import { ReactComponent as AccountIcon } from "../assets/icons/account_circle.svg";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const { signedIn, userInfo, logout } = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);
  const [noticeDropdown, setNoticeDropdown] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    //검색어 기반으로 api 호출함.
    const response = await fetch(`/api/stocks?query${query}`);
    const data = await response.json();
    setResults(data); //검색 결과를 상태로 저장함
  };

  const onClickUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const onClickNoticeDropdown = () => {
    setNoticeDropdown(!noticeDropdown);
  };

  const handleSignOut = () => {
    logout();
    window.location.href = "/"; // 로그아웃하면 홈페이지로 리디렉션
  };
  console.log(userInfo); //TODO

  const userName = userInfo?.email.split("@")[0];

  return (
    <Wrapper>
      <NavbarContainer>
        <Logo>Ant Helper</Logo>
        <NavLinks>
          <Link to="/">홈</Link>
          <Link to="/account">내 계좌</Link>
          <Link to="/ai-trade">AI 거래</Link>
          <SearchBar onSearch={handleSearch} placeholder="검색" />
        </NavLinks>
        <SearchResults results={results} />
        <UserMenu>
          {signedIn ? (
            <>
              <UserIcon onClick={onClickNoticeDropdown}>
                <NotificationIcon />
              </UserIcon>
              <UserIcon onClick={onClickUserDropdown}>
                <AccountIcon />
              </UserIcon>
            </>
          ) : (
            <CustomLink to="/signin">로그인</CustomLink>
          )}
        </UserMenu>
      </NavbarContainer>
      {userDropdown && (
        <UserDropdownMenu>
          {" "}
          <div>{userName}</div>
          <Link to="/settings">설정</Link>
          <Link onClick={handleSignOut}>로그아웃</Link>
        </UserDropdownMenu>
      )}
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-items: center;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative; /* Important to keep the dropdown relative to Navbar */
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    margin: 0 15px;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }
`;

// const SearchBar = styled.input`
//   padding: 8px;
//   border-radius: 20px;
//   border: 1px solid #ddd;
// `;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.div`
  margin-left: 20px;
  cursor: pointer;
  position: relative;
`;

const UserDropdownMenu = styled.div`
  position: absolute;
  top: 70px; /* Adjust according to the height of the Navbar */
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure the dropdown appears above other content */

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

const CustomLink = styled(Link)`
  color: grey;
  text-decoration: none;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;
