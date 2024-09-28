import React, { useState } from 'react';
import apiClient from '../axiosConfig';
import { Button, Form, Input, Inputs, StyledButton, Title, Wrapper } from '../components/Common';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);
  const [code, setAuthCode] = useState('');
  const [pw, setPW] = useState('');
  const [pwCheck, setPWCheck] = useState('');
  const [authSent, setAuthSent] = useState(false);
  const [authVerified, setAuthVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEmailValid = email !== '';
  const isCodeValid = code !== '';

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePW = (e) => {
    setPW(e.target.value);
  };
  const onChangePWCheck = (e) => {
    setPWCheck(e.target.value);
  };
  const onChangeAuthCode = (e) => {
    const value = e.target.value;
    setAuthCode(value !== '' ? parseInt(value, 10) : ''); // 정수로 변환
  };

  // 이메일 인증 요청(verification-request) API 처리
  const onClickSendCode = async () => {
    try {
      const response = await apiClient.post('/api/email/verification-request', {
        email: email,
      });
      if (response.data.isSuccess) {
        // 인증 코드 발송 성공
        setAuthSent(true);
        setErrorMessage('인증번호가 발송되었습니다.');
      } else {
        setErrorMessage('이메일 인증 요청에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('이미 가입된 이메일입니다.');
      } else {
        setErrorMessage('인증번호 발송에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // 인증번호 확인(verification) API 처리
  const onClickVerifyCode = async () => {
    try {
      const response = await apiClient.post('/api/email/verification', {
        email,
        code,
      });

      if (response.data.isSuccess) {
        setAuthVerified(true);
        setErrorMessage('인증이 완료되었습니다.');
        setToken(response.data.data.token);
      } else {
        setErrorMessage('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setErrorMessage('인증번호 확인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  // 회원가입(signup) API
  const onClickSignUp = async () => {
    if (pw !== pwCheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    if (!passwordRegex.test(pw)) {
      setErrorMessage('비밀번호는 최소 8자이며, 문자와 숫자를 모두 포함해야 합니다.');
      return;
    }

    try {
      const response = await apiClient.post('/api/members/signup', {
        token: token,
        email: email,
        pw: pw,
        appKey: 'yourAppKey',
        secretKey: 'yourSecretKey',
      });

      if (response.data.isSuccess) {
        alert('회원가입을 완료했습니다.');
        window.location.href = '/';
      } else {
        setErrorMessage('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('이미 존재하는 회원입니다.');
      } else {
        setErrorMessage('에러로 인해 회원가입에 실패했습니다. 다시 시도해 주세요.');
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
              value={code}
              onChange={onChangeAuthCode}
              disabled={authVerified}
            />
          )}
          {!authSent ? (
            <StyledButton onClick={onClickSendCode} disabled={!isEmailValid}>
              인증번호 전송
            </StyledButton>
          ) : !authVerified ? (
            <StyledButton onClick={onClickVerifyCode} disabled={!isCodeValid}>
              인증번호 확인
            </StyledButton>
          ) : (
            <Button disabled>완료</Button>
          )}
        </Inputs>
        <Inputs>
          <Input placeholder="비밀번호" type="password" value={pw} onChange={onChangePW} />
          <Input
            placeholder="비밀번호 확인"
            type="password"
            value={pwCheck}
            onChange={onChangePWCheck}
          />
          <StyledButton onClick={onClickSignUp} disabled={!authVerified}>
            확인
          </StyledButton>
        </Inputs>
      </Form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </Wrapper>
  );
};

export default SignUp;
