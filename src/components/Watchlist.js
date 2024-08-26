import React from "react";
import styled from "styled-components";

const WatchlistContainer = styled.div`
  width: 80%;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: ${(props) =>
    props.positive ? "red" : props.negative ? "blue" : "black"};
`;

const Watchlist = () => {
  //현재 가짜데이터임
  const mockData = [
    {
      rank: 1,
      name: "카카오",
      price: "82,000원",
      change: "+1,200원 (1.5%)",
      volume: "200억원",
      amount: "500,000주",
      positive: true,
    },
    {
      rank: 2,
      name: "삼성전자",
      price: "68,500원",
      change: "-500원 (0.7%)",
      volume: "300억원",
      amount: "1,000,000주",
      negative: true,
    },
    {
      rank: 3,
      name: "LG화학",
      price: "600,000원",
      change: "+10,000원 (1.7%)",
      volume: "100억원",
      amount: "200,000주",
      positive: true,
    },
    //...
  ];

  return (
    <WatchlistContainer>
      <h2>관심종목</h2>
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
    </WatchlistContainer>
  );
};

export default Watchlist;
