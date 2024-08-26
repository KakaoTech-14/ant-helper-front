//styled-components는 CSS-in-JS 방식으로 스타일을 작성할 수 있는 라이브러리
//CSS를 별도의 파일이 아닌 자바스크립트 파일 내에서 직접 작성할 수 있으며, 각 스타일이 특정 컴포넌트에만 적용되도록 모듈화
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: hidden;
`;
//align-items: center;
//justify-items: center;

export const Form = styled.div`
  display: block;
  height: 100%;
`;

export const Inputs = styled.div`
  display: block;
  margin: 40px;
`;

export const Input = styled.input`
  display: block;
  font-size: 20px;
  height: 20px;
  border: 2px solid grey;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  &::placeholder {
    color: darkgrey;
    font-size: 20px;
    font-weight: 300;
    font-family: "Goorm Sans";
  }
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin: 50px;
`;

export const Button = styled.button`
  width: 100%;
  margin: 10px 0px;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;
export const StyledButton = styled(Button)`
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "black")};
  cursor: ${(props) => (props.disabled ? "disabled" : "pointer")};
  &:hover {
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "black")};
  }
`;
