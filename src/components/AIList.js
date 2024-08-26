import React from "react";
import {
  StockTableContainer,
  Table,
  TableHeader,
  TableData,
} from "./StockTable";

const AIList = () => {
  //가짜데이터
  const mockData = [
    {
      rank: 1,
      name: "테슬라",
      price: "4,465원",
      change: "+825원 (22.6%)",
      volume: "31억원",
      amount: "719,264주",
      positive: true,
    },
    {
      rank: 2,
      name: "신풍제약",
      price: "18,210원",
      change: "+2,380원 (15.0%)",
      volume: "23억원",
      amount: "125,259주",
      positive: true,
    },
    {
      rank: 3,
      name: "씨젠",
      price: "73,700원",
      change: "-4,600원 (5.8%)",
      volume: "7.4억원",
      amount: "9,942주",
      negative: true,
    },
    {
      rank: 4,
      name: "셀트리온",
      price: "12,550원",
      change: "+2,300원 (22.4%)",
      volume: "6.7억원",
      amount: "53,086주",
      positive: true,
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
            <TableHeader>거래대금</TableHeader>
            <TableHeader>거래량</TableHeader>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, index) => (
            <tr key={index}>
              <TableData>{item.rank}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.price}</TableData>
              <TableData positive={item.positive} negative={item.negative}>
                {item.change}
              </TableData>
              <TableData>{item.volume}</TableData>
              <TableData>{item.amount}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default AIList;
