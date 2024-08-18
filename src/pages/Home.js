import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Input, Title, Wrapper } from "../components/Common";

const Home = () => {
  return (
    <Wrapper>
      <Title>Ant Helper</Title>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </Wrapper>
  );
};

export default Home;
