import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  return (
    <ul>
      {results.map((stock) => (
        <li key={stock.code}>
          <Link to={`/stock/${stock.code}`}>{stock.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
