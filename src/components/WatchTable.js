import React from "react";
import {
  StockTableContainer,
  Table,
  TableHeader,
  TableData,
} from "./StockTable";

const WatchTable = () => {
  // 현재 가짜 데이터임
  const mockData = [
    {
      rank: 1,
      name: "카카오",
      price: 82000, //가격
      change: 1200, // 변동 금액
      changePercentage: 1.5, // 변동 퍼센트
      volume: 20000000000, // 거래대금
      amount: 500000, // 거래량(주)
    },
    {
      rank: 2,
      name: "삼성전자",
      price: 68500,
      change: -500,
      changePercentage: -0.7,
      volume: 30000000000,
      amount: 1000000,
    },
    {
      rank: 3,
      name: "LG화학",
      price: 600000,
      change: 10000,
      changePercentage: 1.7,
      volume: 10000000000,
      amount: 200000,
    },
    //...
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
            <TableHeader>거래대금</TableHeader>
            <TableHeader>거래량</TableHeader>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) => (
            <tr key={index}>
              <TableData>{item.rank}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.price.toLocaleString()}원</TableData>
              <TableData change={item.change}>
                {item.change > 0 ? "+" : ""}
                {item.change.toLocaleString()}원 ({item.changePercentage}%)
              </TableData>
              <TableData>{(item.volume / 100000000).toFixed(1)}억원</TableData>
              <TableData>{item.amount.toLocaleString()}주</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default WatchTable;
