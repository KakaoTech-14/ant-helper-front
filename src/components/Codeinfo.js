import React, { useState } from "react";

const CodeInfo = () => {
  const [stockData, setStockData] = useState(null);
  const [productNumber, setProductNumber] = useState("");

  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `/api/stocks/price?productNumber=${productNumber}`
      );
      const data = await response.json();

      if (data.isSuccess && data.data && data.data.output) {
        const { rprs_mrkt_kor_name, stck_prpr, prdy_ctrt } = data.data.output;
        setStockData({
          name: rprs_mrkt_kor_name,
          code: productNumber,
          price: stck_prpr,
          changeRate: prdy_ctrt,
        });
      } else {
        console.error("Invalid data format or response.");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData();
  };

  return (
    <div>
      <h1>주식 정보 조회</h1>
      <form onSubmit={handleSubmit}>
        <label>
          주식 코드 입력:
          <input
            type="text"
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
          />
        </label>
        <button type="submit">조회</button>
      </form>
      {stockData && (
        <div>
          <h2>주식 정보</h2>
          <p>이름: {stockData.name}</p>
          <p>코드: {stockData.code}</p>
          <p>현재 가격: {stockData.price}</p>
          <p>등락률: {stockData.changeRate}%</p>
        </div>
      )}
    </div>
  );
};

export default CodeInfo;
