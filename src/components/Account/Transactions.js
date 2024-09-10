import React, { useEffect, useState } from 'react';
import apiClient from '../../axiosConfig'; // API 요청을 위한 클라이언트

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await apiClient.get('/api/stocks/balance', {
        params: { CTX_AREA_FK100: '', CTX_AREA_NK100: '' },
      });
      if (response.data && response.data.isSuccess) {
        setTransactions(response.data.data.output1);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">체결 내역</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center">
            <th className="py-2 px-4 border-b">날짜</th>
            <th className="py-2 px-4 border-b">시간</th>
            <th className="py-2 px-4 border-b">종목명</th>
            <th className="py-2 px-4 border-b">매입가</th>
            <th className="py-2 px-4 border-b">보유수량</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="text-center border-t">
              <td className="py-2">{new Date().toLocaleDateString()}</td> {/* 임시 날짜 */}
              <td className="py-2">{new Date().toLocaleTimeString().slice(0, 5)}</td>{' '}
              {/* 임시 시간 */}
              <td className="py-2">{transaction.prdt_name}</td>
              <td className="py-2">{Number(transaction.pchs_avg_pric).toLocaleString()}원</td>
              <td className="py-2">{transaction.hldg_qty}주</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
