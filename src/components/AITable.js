import React from 'react';
import { StockTableContainer, Table, TableData, TableHeader } from './StockTable';

const AITable = () => {
  // 가짜 데이터
  const mockData = [
    {
      rank: 1,
      name: '테슬라',
      price: 4465, // 가격
      change: 825, // 변동 금액
      changePercentage: 22.6, // 변동 퍼센트
      volume: 3100000000, // 거래대금
      amount: 719264, // 거래량(주)
    },
    {
      rank: 2,
      name: '신풍제약',
      price: 18210,
      change: 2380,
      changePercentage: 15.0,
      volume: 2300000000,
      amount: 125259,
    },
    {
      rank: 3,
      name: '씨젠',
      price: 73700,
      change: -4600,
      changePercentage: -5.8,
      volume: 740000000,
      amount: 9942,
    },
    {
      rank: 4,
      name: '셀트리온',
      price: 12550,
      change: 2300,
      changePercentage: 22.4,
      volume: 670000000,
      amount: 53086,
    },
  ];

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
          {mockData.map((item, index) => (
            <tr key={index}>
              <TableData>{item.rank}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.price.toLocaleString()}원</TableData>
              <TableData change={item.change}>
                {item.change > 0 ? '+' : ''}
                {item.change.toLocaleString()}원 ({item.changePercentage}%)
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default AITable;
