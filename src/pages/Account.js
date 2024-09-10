import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Wrapper } from '../components/Common';
import AccountSidebar from '../components/Account/AccountSidebar';
import AccountOverview from '../components/Account/AccountOverview'; // 내 주식 현황 컴포넌트
import Transactions from '../components/Account/Transactions'; // 체결 내역 컴포넌트

const Account = () => {
  return (
    <Wrapper>
      <NavBar />
      <div className="w-full flex">
        <AccountSidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AccountOverview />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
