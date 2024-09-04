import React, { useEffect, useState } from "react";
import axios from "axios";
import StockItem from "./StockItem";
import { StockTableContainer, Table, TableHeader } from "./StockTable";

const WatchTable = () => {
  const [watchData, setWatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //로딩 꼭 필요한가..?

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); // 토큰을 저장한 위치에서 가져옵니다.

    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/watchlist`,
          {
            params: {
              size: 10,
              page: 0,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);

        if (response.data.isSuccess && response.data.data) {
          //isSuccess만 비교해도 될듯?
          setWatchData(response.data.data.content);
        }
      } catch (error) {
        console.error("관심종목을 가져오는데 실패했습니다.", error);
        setIsLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  if (isLoading) {
    return <div>관심종목을 불러오는 중..</div>;
  }

  return (
    <StockTableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>종목</TableHeader>
            <TableHeader>현재가</TableHeader>
            <TableHeader>등락률</TableHeader>
          </tr>
        </thead>
        <tbody>
          {watchData.map((item) => (
            <StockItem
              key={item.productNumber}
              productNumber={item.productNumber}
              defaultName={item.name} // Watchlist에서 받은 이름 전달
            />
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default WatchTable;
