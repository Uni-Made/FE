import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #00c2c7;
  text-align: left;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  font-weight: bold;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;
