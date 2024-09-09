import { useEffect, useState } from 'react';
import apiClient from '../axiosConfig';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';

const AITradeNew = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [capital, setCapital] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  //AI추천종목 불러오기
  useEffect(() => {
    const fetchRecommendationsWithPrices = async () => {
      try {
        const response = await apiClient.get('/api/stocks/recommendations', {
          params: {
            size: 10,
            page: 0,
          },
        });

        if (response.data.isSuccess) {
          const recommendationsWithPrices = await Promise.all(
            response.data.data.map(async (stock) => {
              const price = await fetchPrice(stock.productNumber);
              return { ...stock, price };
            }),
          );
          setRecommendations(recommendationsWithPrices);
        }
      } catch (error) {
        console.error('Error at "/api/stocks/recommendations"', error);
      }
    };

    fetchRecommendationsWithPrices();
  }, []);

  const fetchPrice = async (productNumber) => {
    try {
      const response = await apiClient.get('/api/stocks/price', {
        params: { productNumber },
      });

      if (response.data.isSuccess) {
        return response.data.data.output.stck_prpr;
      } else {
        return 'N/A';
      }
    } catch (error) {
      console.error(`가격 정보를 가져오는 중 오류 발생: ${productNumber}`, error);
      return 'N/A';
    }
  };

  const handleAddStock = async (stock) => {
    const price = await fetchPrice(stock.productNumber);
    const stockWithPrice = { ...stock, price };
    setSelectedStocks([...selectedStocks, stockWithPrice]);
    setRecommendations(recommendations.filter((item) => item.name !== stock.name));
  };

  const handleRemoveStock = (stock) => {
    setSelectedStocks(selectedStocks.filter((item) => item.name !== stock.name));
    setRecommendations([...recommendations, stock]);
  };

  const handleNextClick = () => {
    setIsModalOpen(true);
    window.history.pushState(null, null, 'ai-trade/next');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  return (
    <Wrapper>
      <NavBar />
      <Container>
        {/* AI 추천 종목 */}
        <Recommendations>
          <StockHeader>AI 추천종목</StockHeader>
          <ScrollArea>
            {recommendations.map((stock, index) => (
              <TradeItem key={index}>
                <div>
                  {stock.name}
                  <span style={{ marginLeft: '10px' }}>
                    {stock.price ? `${stock.price}원` : 'N/A'}
                  </span>
                </div>
                <div>
                  <ActionButton onClick={() => handleAddStock(stock)}>담기</ActionButton>
                </div>
              </TradeItem>
            ))}
          </ScrollArea>
        </Recommendations>

        {/* 담은 주식과 자본금*/}
        <SelectedList>
          <StockHeader>담은 주식</StockHeader>
          <ScrollArea>
            {selectedStocks.map((stock, index) => (
              <TradeItem key={index}>
                <div>
                  {stock.name}{' '}
                  <span style={{ marginLeft: '10px' }}>
                    {stock.price ? `${stock.price}원` : 'N/A'}
                  </span>
                </div>
                <div>
                  <ActionButton onClick={() => handleRemoveStock(stock)}>-</ActionButton>
                </div>
              </TradeItem>
            ))}
          </ScrollArea>
          <CapitalInput>
            <label>자본금 입력: </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="자본금을 입력하세요"
            />
          </CapitalInput>
          <Footer>
            <div>{selectedStocks.length} / 10</div>
            <ActionButton onClick={handleNextClick}>다음</ActionButton>
          </Footer>
        </SelectedList>
        {/* 모달 창 */}
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <Disclaimer>
              <CloseButton onClick={handleCloseModal}>이전</CloseButton>
              <h2>면책 조항</h2>
              <p>이대로 거래를 진행하시겠습니까?</p>
              <ModalFooter>
                <ActionButton>AI 거래 시작</ActionButton>
              </ModalFooter>
            </Disclaimer>
          </Modal>
        )}
      </Container>
    </Wrapper>
  );
};

export default AITradeNew;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
`;

const StockHeader = styled.div`
  margin-bottom: 20px;
`;

const Recommendations = styled.div`
  width: 40%;
  max-width: 500px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 500px;
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

const TradeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CapitalInput = styled.div`
  input {
    padding: 5px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 10px 0;
`;

const Disclaimer = styled.div`
  text-align: center;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
