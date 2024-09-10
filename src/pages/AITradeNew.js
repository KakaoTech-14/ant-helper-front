import { useEffect, useState } from 'react';
import apiClient from '../axiosConfig';
import {
  Wrapper,
  Container,
  StockHeader,
  Recommendations,
  SelectedList,
  ScrollArea,
  TradeItem,
  CapitalInput,
  Footer,
  Disclaimer,
  CloseButton,
  ModalFooter,
  ActionButton,
} from '../components/TradeStyles';
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
    try {
      const response = await apiClient.get('/api/stocks/price', {
        params: { productNumber: stock.productNumber },
      });

      if (response.data.isSuccess) {
        // 필요한 정보만 추출하자
        const stockWithInfo = {
          productNumber: stock.productNumber,
          name: response.data.data.output.name,
          industry: response.data.data.output.bstp_kor_isnm,
          price: response.data.data.output.stck_prpr,
        };

        // selectedStocks에 주식 추가
        setSelectedStocks([...selectedStocks, stockWithInfo]);

        // recommendations에서 해당 주식 제거
        setRecommendations(
          recommendations.filter((item) => item.productNumber !== stock.productNumber),
        );
      }
    } catch (error) {
      console.error(`가격 정보를 가져오는 중 오류 발생: ${stock.productNumber}`, error);
    }
  };

  const handleRemoveStock = (stock) => {
    setSelectedStocks(selectedStocks.filter((item) => item.name !== stock.name));
    setRecommendations([...recommendations, stock]);
  };

  const handleNextClick = () => {
    const maxStockPrice = 100000;
    if (capital >= maxStockPrice && selectedStocks.length >= 3) {
      setIsModalOpen(true);
      window.history.pushState(null, null, 'ai-trade/next');
    } else {
      alert(`자본금은 100,000원 이상, 담은 주식은 3개 이상이어야 합니다. 다시 한번 확인해 주세요.`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  // 주문 API 호출
  const handleOrder = async () => {
    try {
      const transactionItems = selectedStocks.map((stock) => ({
        productNumber: stock.productNumber,
        name: stock.name,
        industry: stock.industry,
      }));

      const orderRequest = {
        amount: capital, // 자본금
        transactionItems, // 거래할 종목들
      };

      const response = await apiClient.post('/api/transactions', orderRequest);

      if (response.data.isSuccess) {
        alert('거래가 성공적으로 완료되었습니다.');
        setIsModalOpen(false);
        // TODO: 거래 완료 후 UI 처리 더 필요?
        window.location.href = '/';
      } else {
        alert('거래 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('주문 처리 중 오류 발생:', error);
      alert('거래 도중 오류가 발생했습니다.');
    }
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
              <p>면책 조항</p>
              <p>이대로 거래를 진행하시겠습니까?</p>
              <ModalFooter>
                <ActionButton onClick={handleOrder}>AI 거래 시작</ActionButton>
              </ModalFooter>
            </Disclaimer>
          </Modal>
        )}
      </Container>
    </Wrapper>
  );
};

export default AITradeNew;
