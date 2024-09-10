import React, { useEffect, useState } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import apiClient from '../axiosConfig';
import { ButtonGroupItem } from './Common';
import WatchToggle from './WatchToggle';
import styled from 'styled-components';

export const StockNameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

export const StockName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-left: 10px; // 하트와 이름 사이 간격
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BUTTONS = [
  { label: '일', value: 'D' },
  { label: '주', value: 'W' },
  { label: '월', value: 'M' },
  { label: '년', value: 'Y' },
];

const CandlestickChart = ({ productNumber }) => {
  const [chartData, setChartData] = useState(null);
  const [name, setName] = useState('');
  const [periodCode, setPeriodCode] = useState('D');
  const [isWatchedInitial, setIsWatchedInitial] = useState(false); // 초기 하트 상태

  // 주식 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await apiClient.get('/api/stocks/price-chart', {
          params: {
            productNumber,
            periodCode,
          },
        });

        if (response.data.isSuccess) {
          const stockData = response.data.data.output2.reverse(); // 최신순으로 정렬
          const labels = stockData.map((item) => item.stck_bsop_date);
          const data = stockData.map((item) => ({
            x: item.stck_bsop_date,
            y: [item.stck_oprc, item.stck_clpr, item.stck_hgpr, item.stck_lwpr],
          }));
          const backgroundColor = stockData.map((item) =>
            item.stck_clpr > item.stck_oprc ? 'red' : 'blue',
          );

          setChartData({
            labels,
            datasets: [
              {
                label: 'Stock Price',
                data,
                backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 2,
              },
            ],
          });

          setName(response.data.data.output1.hts_kor_isnm); // 주식 이름 설정
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };

    fetchStockData();
  }, [periodCode, productNumber]);

  // 관심종목 정보를 가져오는 useEffect
  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const response = await apiClient.get('/api/watchlist', {
          params: { size: 10, page: 0 },
        });

        if (response.data.isSuccess) {
          const watchList = response.data.data.content;
          const isWatched = watchList.some((item) => item.productNumber === productNumber);
          setIsWatchedInitial(isWatched); // 주식이 관심 목록에 있으면 true
        }
      } catch (error) {
        console.error('관심종목을 가져오는 중 오류 발생', error);
      }
    };

    fetchWatchList();
  }, [productNumber]);

  const options = {
    responsive: true,
    scales: {
      x: { type: 'category' },
      y: { beginAtZero: false },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div>
      <StockNameWrapper>
        <WatchToggle
          isWatchedInitial={isWatchedInitial}
          productNumber={productNumber}
          name={name}
          industry="YourIndustry" // 적절한 industry 값 입력
        />
        <StockName>{name}</StockName>
      </StockNameWrapper>

      {/* 기간 선택 버튼 */}
      <div className="inline-flex rounded-md shadow-sm">
        {BUTTONS.map((button, index) => (
          <ButtonGroupItem
            key={index}
            text={button.label}
            onClick={() => setPeriodCode(button.value)}
            isClicked={periodCode === button.value}
          />
        ))}
      </div>

      {/* 차트 렌더링 */}
      {chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default CandlestickChart;
