import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import styled from "styled-components";

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Sidebar = styled.div`
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: black;
  font-size: 20px;

  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
  }
`;

const Settings = () => {
  return (
    <SettingsWrapper>
      <NavBar />
      <ContentContainer>
        <Sidebar>
          <StyledNavLink to="/settings" end>
            설정
          </StyledNavLink>
          <StyledNavLink to="/settings/investment-preference">
            투자 성향 변경
          </StyledNavLink>
        </Sidebar>
        <Content>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h3>기본 설정</h3> <h3>회원정보 수정</h3>
                </div>
              }
            />
            <Route path="/investment-preference" element={<h3>투자 성향</h3>} />
          </Routes>
        </Content>
      </ContentContainer>
    </SettingsWrapper>
  );
};

export default Settings;
