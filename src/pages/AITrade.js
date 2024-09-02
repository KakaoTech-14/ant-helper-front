import React from "react";
import { useAITrade } from "../contexts/AITradeContext";
import AITradeNew from "./AITradeNew";
import AITradeExisting from "./AITradeExisting";

const AITrade = () => {
  const { isTrading } = useAITrade();

  return isTrading ? <AITradeExisting /> : <AITradeNew />;
};

export default AITrade;
