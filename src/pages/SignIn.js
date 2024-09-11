import React, { useState } from 'react';
import apiClient from '../axiosConfig';
import { Form, Input, Inputs, StyledButton, Title, Wrapper } from '../components/Common';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CustomLink = styled(Link)`
  margin: 10px;
  color: black;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const isFormValid = email !== '' && pw !== '';

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePW = (e) => {
    setPW(e.target.value);
  };

  const onClick = async () => {
    if (!isFormValid) return;

    try {
      // form-data형식으로 객체 만들고 전송
      const formData = new FormData();
      formData.append('email', email);
      formData.append('pw', pw);

      const response = await apiClient.post('/api/members/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { accessToken, refreshToken } = response.data.data;

      if (accessToken) {
        alert('로그인에 성공했습니다.');

        login(email);

        // accessToken은 메모리에 저장함. 브라우저가 닫힐 때 자동삭제.
        sessionStorage.setItem('accessToken', accessToken);
        // refreshToken은 localStorage에 저장함.
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/');
      } else {
        setErrorMessage('로그인에 실패했습니다.');
      }
    } catch (error) {
      setErrorMessage('에러가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form>
        <Inputs>
          <Input placeholder="이메일" type="email" value={email} onChange={onChangeEmail} />
          <Input placeholder="비밀번호" type="password" value={pw} onChange={onChangePW} />
          <StyledButton onClick={onClick} disabled={!isFormValid}>
            확인
          </StyledButton>
        </Inputs>
      </Form>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <CustomLink to="/signup">회원가입 하기</CustomLink>
    </Wrapper>
  );
};

export default SignIn;
