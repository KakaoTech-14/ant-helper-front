import React, { useState } from "react";

import Navbar from "../components/Navbar";
import { Wrapper } from "../components/Common";
import AIList from "../components/AIList";
import WatchList from "../components/WatchList";
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
  const [activeTab, setActiveTab] = useState("recommendations");

  return (
    <Wrapper>
      <Navbar />
      <TabsContainer>
        <Tab
          active={activeTab === "recommendations"}
          onClick={() => setActiveTab("recommendations")}
        >
          AI 추천종목
        </Tab>
        <Tab
          active={activeTab === "watchlist"}
          onClick={() => setActiveTab("watchlist")}
        >
          관심종목
        </Tab>
      </TabsContainer>
      {activeTab === "recommendations" && <AIList />}
      {activeTab === "watchlist" && <WatchList />}
    </Wrapper>
  );
};

export default Home;
