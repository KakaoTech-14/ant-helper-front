import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Inputs,
  Title,
  Wrapper,
  Button,
} from "../components/Common";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form>
        <Inputs>
          <Input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </Inputs>
        <Button>확인</Button>
      </Form>
      <CustomLink to="/signup">회원가입 하기</CustomLink>
    </Wrapper>
  );
};

export default Signin;

//Link 컴포넌트를 상속
const CustomLink = styled(Link)`
  margin: 10px;
  color: black;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;
