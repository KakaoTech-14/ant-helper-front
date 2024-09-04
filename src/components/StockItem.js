import React, { useEffect, useState } from "react";
import axios from "axios";

const StockItem = ({ productNumber, defaultName }) => {
  const [stockData, setStockData] = useState({
    itemName: defaultName || "(추가예정)",
    currentPrice: null,
    change: null,
    changePercentage: null,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); // 토큰을 저장한 위치에서 가져옵니다.

    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/stocks/price`,
          {
            params: { productNumber },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.isSuccess && response.data.data) {
          const { stck_prpr, prdy_vrss, prdy_ctrt } = response.data.data.output;
          setStockData({
            itemName: defaultName || "(추가예정)", // 아직 이름 미구현, 기본값
            currentPrice: stck_prpr,
            change: prdy_vrss,
            changePercentage: prdy_ctrt,
          });
        }
      } catch (error) {
        console.error(`price api fetch 중 오류 발생, ${productNumber}`, error);
      }
    };

    fetchStockData();
  }, [productNumber, defaultName]);

  return (
    <tr>
      <td>{stockData.itemName}</td>
      <td>{productNumber}</td>
      <td>
        {stockData.currentPrice
          ? `${parseInt(stockData.currentPrice).toLocaleString()}원`
          : "N/A"}
      </td>
      <td style={{ color: stockData.change > 0 ? "red" : "blue" }}>
        {stockData.change
          ? `${parseInt(stockData.change).toLocaleString()}원 (${
              stockData.changePercentage
            }%)`
          : "N/A"}
      </td>
    </tr>
  );
};

export default StockItem;
