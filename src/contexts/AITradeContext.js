import React, { createContext, useState, useEffect } from "react";
import apiClient from "../axiosConfig";
const AITradeContext = createContext();

export const AITradeProvider = ({ children }) => {
  const [isTrading, setIsTrading] = useState(false);
  const [transactionItems, setTransactionItems] = useState([]);

  useEffect(() => {
    apiClient
      .get("/api/watchlist")
      .then((response) => {
        const { existence, transactionItems } = response.data.data;
        setIsTrading(existence);
        setTransactionItems(transactionItems || []);
      })
      .catch((error) => console.error('Error at "/api/transactins"', error));
  }, []);

  return (
    <AITradeContext.Provider value={{ isTrading, transactionItems }}>
      {children}
    </AITradeContext.Provider>
  );
};

export const useAITrade = () => React.useContext(AITradeContext);
