import React, { useEffect, useState } from 'react';
import apiClient from '../../axiosConfig';

const AccountOverview = () => {
  // 총 손익, 총 매입 보여준 후
  // 종목별로 표 형태로, 종목명, 매입가, 보유수량, 평가손익, 현재가, 수익률 보여주기.
  const [balanceData, setBalanceData] = useState(null);

  const fetchBalanceData = async () => {
    try {
      const response = await apiClient.get('/api/stocks/balance', {
        params: { CTX_AREA_FK100: '', CTX_AREA_NK100: '' },
      });
      if (response.data && response.data.isSuccess) {
        setBalanceData(response.data.data);
      }
    } catch (error) {
      console.error('"/api/stocks/balance"에서 오류 발생: ', error);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  if (!balanceData) {
    return <div>거래 중인 주식이 없습니다.</div>;
  }

  // 총 손익 및 총 매입 관련 정보
  const totalProfit = balanceData.output2[0].evlu_pfls_smtl_amt;
  const totalPurchase = balanceData.output2[0].pchs_amt_smtl_amt;
  const isNegativeRate = Number(totalProfit) < 0;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">내 주식 현황</h1>

      {/* 총 손익, 총 매입 */}
      <div className="my-4">
        <div className="flex space-x-[20px]">
          <span>총 손익</span>
          <span className={`${isNegativeRate ? 'text-blue-500' : 'text-red-500'}`}>
            {Number(totalProfit).toFixed(2)}원 {/* 손익 표시 */}
          </span>
        </div>
        <div className="flex space-x-[20px]">
          <span>총 매입</span>
          <span>
            {totalPurchase}원 {/* 매입 금액 표시 */}
          </span>
        </div>
      </div>

      {/* 종목별 리스트 */}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center">
            <th className="py-2">종목명</th>
            <th className="py-2">보유수량</th>
            <th className="py-2">매입가</th>
            <th className="py-2">현재가</th>
            <th className="py-2">평가손익</th>
            <th className="py-2">수익률</th>
          </tr>
        </thead>
        <tbody>
          {balanceData.output1.map((stock, index) => {
            const isNegativeProfit = Number(stock.evlu_pfls_amt) < 0;
            const isNegativeRate = Number(stock.evlu_erng_rt) < 0;

            return (
              <tr key={index} className="text-center border-t">
                <td className="py-2">{stock.prdt_name}</td>
                <td className="py-2">{stock.hldg_qty}주</td>
                <td className="py-2">{Number(stock.pchs_avg_pric).toLocaleString()}원</td>
                <td className="py-2">{Number(stock.prpr).toLocaleString()}원</td>

                {/* 평가손익 */}
                <td className={`py-2 ${isNegativeProfit ? 'text-blue-500' : 'text-red-500'}`}>
                  {Number(stock.evlu_pfls_amt).toLocaleString()}원
                </td>

                {/* 수익률 */}
                <td className={`py-2 ${isNegativeRate ? 'text-blue-500' : 'text-red-500'}`}>
                  {Number(stock.evlu_erng_rt).toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountOverview;
