import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axiosClient from '../axiosConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CandlestickChart = ({productNumber}) => {
    const [chartData, setChartData] = useState(null);
    const [name, setName] = useState('');
    const [periodCode, setPeriodCode] = useState('D');

    useEffect(() => {
        // API 호출 함수
        const fetchStockData = async () => {
            try {
                const response = await axiosClient.get('https://api.ant-helper.com/api/stocks/price-chart', {
                    params: {
                        productNumber: productNumber,
                        periodCode: periodCode,
                    },
                });

                if (response.data.isSuccess) {
                    let stockData = response.data.data.output2;

                    // 데이터를 최신순으로 정렬
                    stockData = stockData.reverse();

                    const labels = stockData.map(item => item.stck_bsop_date);
                    const data = stockData.map(item => ({
                        x: item.stck_bsop_date,
                        y: [item.stck_oprc, item.stck_clpr, item.stck_hgpr, item.stck_lwpr],
                    }));
                    const backgroundColor = stockData.map(item => (item.stck_clpr > item.stck_oprc ? 'red' : 'blue'));

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
    }, [periodCode]);

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
            <button onClick={() => setPeriodCode('D')}>일</button>
            <button onClick={() => setPeriodCode('W')}>주</button>
            <button onClick={() => setPeriodCode('M')}>월</button>
            <button onClick={() => setPeriodCode('Y')}>년</button>
            {chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default CandlestickChart;