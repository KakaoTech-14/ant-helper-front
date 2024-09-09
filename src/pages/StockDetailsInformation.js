import React, { useState } from 'react';
import { Body, Wrapper } from '../components/Common';
import NavBar from '../components/NavBar';
import CandleStickChart from '../components/CandleStickChart';
import { useParams } from 'react-router-dom';

const StockDetailsInformation = () => {
  const { productNumber } = useParams();

  return (
    <Wrapper>
      <NavBar />
      <Body>
        <div>
          <CandleStickChart productNumber={productNumber} />
        </div>
      </Body>
    </Wrapper>
  );
};

export default StockDetailsInformation;
