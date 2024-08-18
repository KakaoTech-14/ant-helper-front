import React, { useState } from "react";
import { Form, Input, Inputs, Title, Wrapper } from "../components/Common";
import { styled } from "styled-components";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };
  const onClick = () => {
    //회원가입 api처리
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
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
          <Input
            placeholder="비밀번호 확인"
            type="password" //불필요?
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </Inputs>
        <Button>확인</Button>
      </Form>
    </Wrapper>
  );
};

export default Signup;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 5px;
`;
