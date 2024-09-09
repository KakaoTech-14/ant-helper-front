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
import axiosClient from '../axiosConfig';
import { ButtonGroupItem } from './Common';

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

  useEffect(() => {
    // API 호출 함수
    const fetchStockData = async () => {
      try {
        const response = await axiosClient.get(
          'https://api.ant-helper.com/api/stocks/price-chart',
          {
            params: {
              productNumber: productNumber,
              periodCode: periodCode,
            },
          },
        );

        if (response.data.isSuccess) {
          let stockData = response.data.data.output2;

          // 데이터를 최신순으로 정렬
          stockData = stockData.reverse();

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
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 2,
              },
            ],
          });
          setName(response.data.data.output1.hts_kor_isnm);
        }
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };

    fetchStockData();
  }, [periodCode, productNumber]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>{name}</h2>
      <div className="inline-flex rounded-md shadow-sm">
        {BUTTONS.map((button, index) => (
          <ButtonGroupItem
            key={index}
            text={button.label}
            onClick={() => setPeriodCode(button.value)}
            isClicked={periodCode === button.value}></ButtonGroupItem>
        ))}
      </div>
      {chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default CandlestickChart;
