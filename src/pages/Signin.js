import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Inputs,
  Title,
  Wrapper,
  Button,
  StyledButton,
} from "../components/Common";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = email !== "" && pw !== "";

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
      formData.append("email", email);
      formData.append("pw", pw);

      const response = await axios.post(
        "http://15.165.105.24:8080/api/members/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { accessToken, refreshToken } = response.data.data;

      if (accessToken) {
        alert("로그인에 성공했습니다.");

        // accessToken은 메모리에 저장함. 브라우저가 닫힐 때 자동삭제.
        // refreshToken은 localStorage에 저장함.
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.href = "/";
      } else {
        setErrorMessage("로그인에 실패했습니다.");
      }
    } catch (error) {
      //console.error("로그인 요청 중 에러 발생:", error);
      setErrorMessage("에러가 발생했습니다. 다시 시도해 주세요.");
    }
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
            value={pw}
            onChange={onChangePW}
          />
          <StyledButton onClick={onClick} disabled={!isFormValid}>
            확인
          </StyledButton>
        </Inputs>
      </Form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <CustomLink to="/signup">회원가입 하기</CustomLink>
    </Wrapper>
  );
};

export default Signin;

const CustomLink = styled(Link)`
  margin: 10px;
  color: black;
  &:visited {
    color: grey;
    text-decoration: none;
  }
`;
