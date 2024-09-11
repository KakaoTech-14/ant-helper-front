import React, { useEffect, useState } from 'react';
import apiClient from '../axiosConfig';
import { TableData } from './StockTable';
import WatchToggle from './WatchToggle';

const StockItem = ({ productNumber, defaultName, watchListId, industry, isWatchTable, rank }) => {
  const [stockData, setStockData] = useState({
    itemName: defaultName || '(추가예정)',
    currentPrice: null,
    change: null,
    changePercentage: null,
  });

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchStockData = async () => {
      try {
        const response = await apiClient.get(`/api/stocks/price`, {
          params: { productNumber },
        });

        if (response.data.isSuccess) {
          const { stck_prpr, prdy_vrss, prdy_ctrt } = response.data.data.output;
          setStockData({
            itemName: defaultName || '(추가예정)',
            currentPrice: stck_prpr,
            change: prdy_vrss,
            changePercentage: prdy_ctrt,
          });
        } else {
          console.error(`서버에서 실패 응답을 받았습니다: ${response.data}`);
        }
      } catch (error) {
        console.error(`가격 정보를 가져오는 중 오류 발생: ${productNumber}`, error);
      }
    };

    // 첫 데이터 로드한 후
    fetchStockData();

    // 풀링: 5초마다 데이터를 가져옴
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, [productNumber, defaultName]);

  return (
    <tr>
      {/* 순위. AITable일때만 사용 */}
      {rank && <TableData>{rank}</TableData>}

      {/* WatchToggle은 WatchTable에서만 사용 */}
      {isWatchTable && (
        <TableData>
          <WatchToggle
            isWatchedInitial={true}
            watchListId={watchListId}
            productNumber={productNumber}
            name={stockData.itemName}
            industry={industry}
          />
        </TableData>
      )}

      <TableData>{stockData.itemName}</TableData>
      <TableData>
        {stockData.currentPrice ? `${parseInt(stockData.currentPrice).toLocaleString()}원` : 'N/A'}
      </TableData>
      <TableData change={stockData.change}>
        {stockData.change
          ? `${parseInt(stockData.change).toLocaleString()}원 (${stockData.changePercentage}%)`
          : 'N/A'}
      </TableData>
    </tr>
  );
};

export default StockItem;
