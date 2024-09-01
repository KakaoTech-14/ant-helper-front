import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Common";
import AITable from "../components/AITable";
import WatchTable from "../components/WatchTable";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  margin: 20px 0;
  padding-left: 20px;
`;

const Tab = styled.div`
  margin-right: 20px;
  cursor: pointer;

  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.$active ? "2px solid black" : "none")};
`;

const Home = () => {
  const { signedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("ai");
  const navigate = useNavigate();

  return (
    <Wrapper>
      <NavBar />
      <TabsContainer>
        <Tab $active={activeTab === "ai"} onClick={() => setActiveTab("ai")}>
          AI 추천종목
        </Tab>
        <Tab
          $active={activeTab === "watch"}
          onClick={() => {
            if (!signedIn) {
              navigate("/signin");
            }
            setActiveTab("watch");
          }}
        >
          관심종목
        </Tab>
      </TabsContainer>
      {activeTab === "ai" && <AITable />}
      {activeTab === "watch" && <WatchTable />}
    </Wrapper>
  );
};

export default Home;
