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
import styled from "styled-components";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeAuthCode = (e) => {
    setAuthCode(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  //회원가입 api처리
  const onClick = async () => {
    if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      //axios.post요청이 완료될때까지 대기
      const response = await axios.post("/api/members/signup", {
        loginId: email,
        pw: password,
        email: email,
        appKey: "yourAppKey",
        secretKey: "yourSecretKey",
      });

      //axios 요청 끝난 후 실행
      if (response.data.success) {
        alert("회원가입을 완료했습니다.");
        // 추가작업필요
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("이미 존재하는 회원입니다.");
      } else {
        setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    }
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
            placeholder="인증번호 입력"
            type="authCode"
            value={authCode}
            onChange={onChangeAuthCode}
          />
          <Button>인증번호 전송</Button>
        </Inputs>
        <Inputs>
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
          <Button onClick={onClick}>확인</Button>
        </Inputs>
      </Form>
    </Wrapper>
  );
};

export default Signup;
