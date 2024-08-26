import React, { useState } from "react";

import Navbar from "../components/Navbar";
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

  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid black" : "none")};
`;

const Home = () => {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <Wrapper>
      <Navbar />
      <TabsContainer>
        <Tab active={activeTab === "ai"} onClick={() => setActiveTab("ai")}>
          AI 추천종목
        </Tab>
        <Tab
          active={activeTab === "watch"}
          onClick={() => setActiveTab("watch")}
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
