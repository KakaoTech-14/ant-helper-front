import React, { useState, useEffect } from "react";
import apiClient from '../axiosConfig'
import StockItem from "./StockItem";
import { StockTableContainer, Table, TableHeader } from "./StockTable";

const WatchTable = () => {
  const [watchData, setWatchData] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const response = await apiClient.get("/api/watchlist", {
          params: {
            size: 10,
            page: 0,
          },
        });

        if (response.data.isSuccess && response.data.data) {
          setWatchData(response.data.data.content);
        }
      } catch (error) {
        console.error("WatchTable에서 관심종목을 가져오는 중 오류 발생", error);
      }
    };

    fetchWatchList();
  }, []);

  return (
    <StockTableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader> </TableHeader> {/* 하트 아이콘 칸 */}
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
              defaultName={item.name}
              watchListId={item.id} // 관심목록 ID 전달
              industry={item.industry} // 필요시 전달
            />
          ))}
        </tbody>
      </Table>
    </StockTableContainer>
  );
};

export default WatchTable;
