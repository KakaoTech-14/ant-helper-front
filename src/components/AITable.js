import React, { useState, useEffect } from 'react';
import apiClient from '../axiosConfig';
import StockItem from './StockItem';
import { StockTableContainer, Table, TableHeader, TableData } from './StockTable';

const AITable = () => {
  const [aiRecommendations, setAIRecommendations] = useState([]);

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      try {
        const response = await apiClient.get('/api/stocks/recommendations', {
          params: {
            size: 10,
            page: 0,
          },
        });

        if (response.data.isSuccess) {
          setAIRecommendations(response.data.data);
        }
      } catch (error) {
        console.error('AI 추천종목을 가져오는 중 오류 발생', error);
      }
    };

    fetchAIRecommendations();
  }, []);

  return (
    <StockTableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader style={{ width: '50px' }}>순위</TableHeader>
            <TableHeader>종목</TableHeader>
            <TableHeader>현재가</TableHeader>
            <TableHeader>등락률</TableHeader>
          </tr>
        </thead>
        <tbody>
          {aiRecommendations.map((item, index) => (
            <StockItem
              rank={index + 1} // 순위 전달
              key={item.productNumber}
              productNumber={item.productNumber}
              defaultName={item.name}
              industry={item.industry}
              isWatchTable={false} // WatchTable이 아닌 경우
            />
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default AITable;
