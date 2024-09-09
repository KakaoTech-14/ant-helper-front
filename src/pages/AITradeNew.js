import { useState, useEffect } from 'react'
import apiClient from '../axiosConfig'
import styled from 'styled-components'
import NavBar from '../components/NavBar'

const AITradeNew = () => {
  const [recommendations, setRecommendations] = useState([])
  const [selectedStocks, setSelectedStocks] = useState([])

  //AI추천종목 불러오기
  useEffect(() => {
    apiClient
      .get('/api/stocks/recommendations')
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error('Error at "/api/stocks/recommendations"', error))
  }, [])
  const handleAddStock = (stock) => {
    setSelectedStocks([...selectedStocks, stock])
    setRecommendations(recommendations.filter((item) => item.name !== stock.name))
  }

  const handleRemoveStock = (stock) => {
    setSelectedStocks(selectedStocks.filter((item) => item.name !== stock.name))
    setRecommendations([...recommendations, stock])
  }

  return (
    <Wrapper>
      <NavBar />
      <Container>
        {/* AI 추천 종목 */}
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

        {/* 담은 주식 */}
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
  )
}

export default AITradeNew

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
`

const Recommendations = styled.div`
  width: 40%;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`
const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 300px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`
const ScrollArea = styled.div`
  max-height: 400px; // 필요에 따라 조정 가능
  overflow-y: auto;
`

const StockItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 10px 0;
`
