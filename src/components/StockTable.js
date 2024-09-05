import styled from "styled-components";

export const StockTableContainer = styled.div`
  width: 60%;
  padding-left: 20px;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  text-align: right;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

export const TableData = styled.td`
  padding: 10px;
  text-align: right;
  border-bottom: 1px solid #ddd;
  color: ${(props) =>
    props.change > 0 ? "red" : props.change < 0 ? "blue" : "black"};
`;
