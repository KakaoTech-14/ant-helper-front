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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authVerified, setAuthVerified] = useState(false);

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

  // 이메일 중복 확인 및 인증 코드 발송
  const onSendAuthCode = async () => {
    try {
      const response = await axios.get(
        `/api/members/login-id/${email}/duplicate`
      );

      if (response.data.data === false) {
        // 이메일 중복 아님, 인증 코드 발송 로직 추가
        await axios.post("/api/send-auth-code", { email }); // 가정된 API
        setAuthSent(true);
        setErrorMessage("인증번호가 발송되었습니다.");
      } else {
        setErrorMessage("이미 존재하는 이메일입니다.");
      }
    } catch (error) {
      setErrorMessage("인증번호 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 인증번호 확인
  const onVerifyAuthCode = async () => {
    try {
      const response = await axios.post("/api/verify-auth-code", {
        email,
        authCode,
      });

      if (response.data.isSuccess && response.data.code !== 401) {
        setAuthVerified(true);
        setErrorMessage("인증이 완료되었습니다.");
      } else {
        setErrorMessage(
          response.data.message || "인증번호가 일치하지 않습니다."
        );
      }
    } catch (error) {
      setErrorMessage("인증번호 확인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 회원가입 처리
  const onClickSignup = async () => {
    if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 규칙 확인
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 문자와 숫자 포함
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "비밀번호는 최소 8자이며, 문자와 숫자를 포함해야 합니다."
      );
      return;
    }

    try {
      const response = await axios.post("/api/members/signup", {
        loginId: email,
        pw: password,
        email: email,
        appKey: "yourAppKey",
        secretKey: "yourSecretKey",
      });

      if (response.data.isSuccess) {
        alert("회원가입을 완료했습니다.");
        // 홈으로 리디렉션 추가 (예: window.location.href = "/home")
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
            disabled={authVerified}
          />
          {authSent && (
            <Input
              placeholder="인증번호 입력"
              type="text"
              value={authCode}
              onChange={onChangeAuthCode}
              disabled={authVerified}
            />
          )}
          {!authSent ? (
            <Button onClick={onSendAuthCode}>인증번호 전송</Button>
          ) : !authVerified ? (
            <Button onClick={onVerifyAuthCode}>인증번호 확인</Button>
          ) : (
            <Button disabled>완료</Button>
          )}
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
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          <Button onClick={onClickSignup} disabled={!authVerified}>
            확인
          </Button>
        </Inputs>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </Form>
    </Wrapper>
  );
};

export default Signup;
