import React, { useState } from "react";
import styled from "styled-components";

// SearchBar 컴포넌트에 스타일을 적용
const StyledSearchBar = styled.input`
  padding: 8px;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 16px;
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 2) {
      onSearch(value);
    }
  };

  return (
    <StyledSearchBar
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="검색"
    />
  );
};

export default SearchBar;
