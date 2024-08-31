import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopHeader = styled.div`
  /* Event */
  position: relative;
  width: 220px;
  height: 12%;
  left: 10vw;
  /* top: 116px; */

  font-style: normal;
  font-weight: 600;
  font-size: 60px;
  line-height: 97px;
  /* identical to box height */
  text-align: center;

  background: linear-gradient(90deg, #ff0099 0%, #00dddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  text-align: left;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export { Container, TopHeader, Table, TableRow, TableHeader, TableCell };
