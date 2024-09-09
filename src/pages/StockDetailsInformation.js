import React, { useState } from 'react';
import { Body, Wrapper } from '../components/Common';
import NavBar from '../components/NavBar';
import CandleStickChart from '../components/CandleStickChart';

const StockDetailsInformation = () => {
  const [periodCode, setPeriodCode] = useState('D');

  return (
    <Wrapper>
      <NavBar />
      <Body>
        <div>
          <CandleStickChart productNumber={'000660'} periodCode={'M'} />
        </div>
      </Body>
    </Wrapper>
  );
};

export default StockDetailsInformation;
