import React, { useState } from 'react'
import apiClient from '../axiosConfig'
import filledHeart from '../assets/icons/filled-heart.svg'
import emptyHeart from '../assets/icons/empty-heart.svg'
const WatchToggle = ({ isWatchedInitial, watchListId, productNumber, name, industry }) => {
  const [isWatched, setIsWatched] = useState(isWatchedInitial)

  const handleToggle = async () => {
    try {
      if (isWatched) {
        // 관심목록에서 제거하는 API 호출
        const response = await apiClient.delete(`/api/watchlist/${watchListId}`)
        if (response.data.isSuccess) {
          setIsWatched(false) // 관심목록에서 제거된 상태로 업데이트
        }
      } else {
        // 관심목록에 추가하는 API 호출
        const response = await apiClient.post(`/api/watchlist`, {
          productNumber,
          name,
          industry,
        })
        if (response.data.isSuccess) {
          setIsWatched(true) // 관심목록에 추가된 상태로 업데이트
        }
      }
    } catch (error) {
      console.error('WatchToggle에서 오류 발생', error)
    }
  }

  return (
    <img
      src={isWatched ? filledHeart : emptyHeart}
      alt="watch-toggle"
      onClick={handleToggle}
      style={{ cursor: 'pointer' }}
    />
  )
}

export default WatchToggle
