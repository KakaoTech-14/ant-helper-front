import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-evenly;
`;

export const StockHeader = styled.div`
  margin-bottom: 20px;
`;

export const Recommendations = styled.div`
  width: 40%;
  max-width: 500px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 500px;
  min-height: 300px;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const ScrollArea = styled.div`
  max-height: 400px; // 필요에 따라 조정 가능
  overflow-y: auto;
`;

export const TradeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CapitalInput = styled.div`
  input {
    padding: 5px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  margin-bottom: 20px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 10px 0;
`;

export const Disclaimer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
