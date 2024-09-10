import React from 'react';

import NavBar from '../components/NavBar';
import { Body, Wrapper } from '../components/Common';
import Sidebar from '../components/Sidebar/Sidebar';

const Account = () => {
  return (
    <Wrapper>
      <NavBar />
      <div className={'w-full'}>
        <Sidebar />
      </div>
    </Wrapper>
  );
};

export default Account;
