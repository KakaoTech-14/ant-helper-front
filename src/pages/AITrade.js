import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const AITrade = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.ant-helper.com/api/stocks/recommendations")
      .then((response) => setRecommendations(response.data))
      .catch((error) =>
        console.error('Error at "/api/stocks/recommendations"', error)
      );
  }, []);
  const handleAddStock = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
    setRecommendations(
      recommendations.filter((item) => item.name !== stock.name)
    );
  };

  const handleRemoveStock = (stock) => {
    setSelectedStocks(
      selectedStocks.filter((item) => item.name !== stock.name)
    );
    setRecommendations([...recommendations, stock]);
  };

  return (
    <Wrapper>
      <Navbar />
      <Container>
        <Recommendations>
          <div>AI 추천종목</div>
          <ScrollArea>
            {recommendations.map((stock, index) => (
              <StockItem key={index}>
                <div>{stock.name}</div>
                <div>
                  {stock.price}
                  <button onClick={() => handleAddStock(stock)}>담기</button>
                </div>
              </StockItem>
            ))}
          </ScrollArea>
        </Recommendations>
        <SelectedList>
          <div>담은 주식</div>
          <ScrollArea>
            {selectedStocks.map((stock, index) => (
              <StockItem key={index}>
                <div>{stock.name}</div>
                <div>
                  {stock.price}
                  <button onClick={() => handleRemoveStock(stock)}>-</button>
                </div>
              </StockItem>
            ))}
          </ScrollArea>
          <Footer>
            <div>{selectedStocks.length} / 10</div>
            <button>다음</button>
          </Footer>
        </SelectedList>
      </Container>
    </Wrapper>
  );
};

export default AITrade;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
`;

const Recommendations = styled.div`
  width: 40%;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 300px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
const ScrollArea = styled.div`
  max-height: 400px; // 필요에 따라 조정 가능
  overflow-y: auto;
`;

const StockItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 10px 0;
`;
