import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosConfig';
import { StyledSearchBar } from './Common';
import { useNavigate } from 'react-router-dom';

const Search = ({ onProductClick }) => {
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState(''); // 검색어 입력을 위한 상태
  const navigate = useNavigate();

  // API 요청 함수
  const fetchSuggestedKeywords = async () => {
    try {
      const response = await axiosClient.get(
        'https://api.ant-helper.com/api/stocks/suggested-keywords',
        {
          params: {
            keyword: keyword,
          },
        },
      );
      if (response.data.isSuccess) {
        setKeywords(response.data.data);
      } else {
        console.error('Failed to fetch keywords', response.data);
      }
    } catch (error) {
      console.error('Error fetching suggested keywords', error);
    }
  };

  // 키워드 변경 시 API 요청
  useEffect(() => {
    if (keyword.length >= 1) {
      fetchSuggestedKeywords();
    } else {
      setKeywords([]); // 검색어가 2글자 미만이면 추천 검색어 목록을 비움
    }
  }, [keyword]);

  // 아이템 클릭 핸들러: 클릭 시 페이지 이동
  const handleItemClick = (productNumber) => {
    setKeyword('');
    setKeywords([]);
    navigate(`/stock-chart/${productNumber}`); // 클릭 시 해당 경로로 이동
  };

  return (
    <div className="relative w-100">
      <StyledSearchBar
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색"
      />
      {keywords.length > 0 && (
        <ul className="absolute max-w-52 left-0 right-0 overflow-y-auto bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
          {keywords.map((item) => (
            <li key={item.productNumber}>
              <button onMouseDown={() => handleItemClick(item.productNumber)}>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
