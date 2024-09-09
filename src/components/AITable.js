import React, { useState, useEffect } from 'react';
import apiClient from '../axiosConfig';
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

        if (response.data.isSuccess && response.data.data) {
          setAIRecommendations(response.data.data);
        }
      } catch (error) {
        console.error('AITable에서 AI 추천종목을 가져오는 중 오류 발생', error);
      }
    };

    fetchAIRecommendations();
  }, []);

  return (
    <StockTableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>순위</TableHeader>
            <TableHeader>종목</TableHeader>
            <TableHeader>현재가</TableHeader>
            <TableHeader>등락률</TableHeader>
          </tr>
        </thead>
        <tbody>
          {aiRecommendations.map((item, index) => (
            <tr key={index}>
              <TableData>{index + 1}</TableData> {/* 순위를 표시 */}
              <TableData>{item.name}</TableData> {/* 종목명 */}
              <TableData>{item.price ? item.price.toLocaleString() + '원' : 'N/A'}</TableData>{' '}
              {/* 현재가 */}
              <TableData change={item.change}>
                {item.change > 0 ? '+' : ''}
                {item.change
                  ? `${item.change.toLocaleString()}원 (${item.changePercentage}%)`
                  : 'N/A'}
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default AITable;
