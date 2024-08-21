import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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

const UserDropdownMenu = styled.div`
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
  const [signedIn, setSignedIn] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [noticeDropdown, setNoticeDropdown] = useState(false);

  const onHandleSignedIn = () => {
    //TODO
    //setSignedIn();
  };
  const onClickUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };
  const onClickNoticeDropdown = () => {
    setNoticeDropdown(!noticeDropdown);
  };

  return (
    <Wrapper>
      <NavbarContainer>
        <Logo>Ant Helper</Logo>
        <NavLinks>
          <Link to="/">홈</Link>
          <Link to="/account">내 계좌</Link>
          <Link to="/ai-trade">AI 거래</Link>
          <SearchBar type="text" placeholder="검색" />
        </NavLinks>
        <UserMenu>
          {signedIn ? (
            <>
              <UserIcon onClick={onClickNoticeDropdown}>🔔</UserIcon>
              <UserIcon onClick={onClickUserDropdown}>👤</UserIcon>
              <UserDropdownMenu show={userDropdown}>
                <div>(사용자명)</div>
                <Link to="/settings">설정</Link>
                //TODO
                <Link to="/signout">로그아웃</Link>
              </UserDropdownMenu>
            </>
          ) : (
            <CustomLink to="/signin">로그인</CustomLink>
          )}
        </UserMenu>
      </NavbarContainer>
    </Wrapper>
  );
};

export default Navbar;

//Link 컴포넌트를 상속
const CustomLink = styled(Link)`
  color: grey;
  text-decoration: none;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;
