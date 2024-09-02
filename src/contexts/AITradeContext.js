import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AITradeContext = createContext();

export const AITradeProvider = ({ children }) => {
  const [isTrading, setIsTrading] = useState(false);
  const [transactionItems, setTransactionItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/transactions`)
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
