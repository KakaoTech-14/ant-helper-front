import React, { useEffect, useState } from 'react'
import apiClient from '../axiosConfig'
import { TableData } from './StockTable'
import WatchToggle from './WatchToggle' // WatchToggle 임포트

const StockItem = ({ productNumber, defaultName, watchListId, industry }) => {
  const [stockData, setStockData] = useState({
    itemName: defaultName || '(추가예정)',
    currentPrice: null,
    change: null,
    changePercentage: null,
  })

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await apiClient.get(`/api/stocks/price`, {
          params: { productNumber },
        })
        if (response.data.isSuccess && response.data.data) {
          const { stck_prpr, prdy_vrss, prdy_ctrt } = response.data.data.output
          setStockData({
            itemName: defaultName || '(추가예정)',
            currentPrice: stck_prpr,
            change: prdy_vrss,
            changePercentage: prdy_ctrt,
          })
        }
      } catch (error) {
        console.error(`price api fetch 중 오류 발생, ${productNumber}`, error)
      }
    }

    fetchStockData()
  }, [productNumber, defaultName])

  return (
    <tr>
      <TableData>
        <WatchToggle
          isWatchedInitial={true} // 처음에 관심목록에 있음
          watchListId={watchListId}
          productNumber={productNumber}
          name={stockData.itemName}
          industry={industry}
        />
      </TableData>
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
  )
}

export default StockItem
