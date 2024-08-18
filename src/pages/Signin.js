import React, { useState } from "react";
import { Form, Input, Inputs, Title, Wrapper } from "../components/Common";
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
  const onClick = () => {
    //로그인 api처리
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

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 5px;
`;
//Link 컴포넌트를 상속
const CustomLink = styled(Link)`
  margin-top: 20px;
  color: black;
  text-decoration: none;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;
