//styled-components는 CSS-in-JS 방식으로 스타일을 작성할 수 있는 라이브러리
//CSS를 별도의 파일이 아닌 자바스크립트 파일 내에서 직접 작성할 수 있으며, 각 스타일이 특정 컴포넌트에만 적용되도록 모듈화
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  justify-items: center;
  overflow-x: hidden;
`;
export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
`;
export const Input = styled.input`
  font-size: 20px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  &::placeholder {
    color: darkgrey;
    font-size: 20px;
    font-weight: 500;
    font-family: "Goorm Sans";
  }
`;

export const Form = styled.div`
  display: flex;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;
