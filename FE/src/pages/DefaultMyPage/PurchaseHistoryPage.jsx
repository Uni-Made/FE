import React from 'react';
import { Container, Title, Table, Th, Td, ProductImage } from './PurchaseHistoryPage.style';

const PurchaseHistoryPage = () => {
  return (
    <Container>
      <Title>구매내역</Title>
      <Table>
        <thead>
          <tr>
            <Th>상품</Th>
            <Th>상품명</Th>
            <Th>구매요청일</Th>
            <Th>입금확인</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td><ProductImage /></Td>
            <Td>상품명입니다.</Td>
            <Td>24/7/14</Td>
            <Td>대기중</Td>
          </tr>
          <tr>
            <Td><ProductImage /></Td>
            <Td>상품명입니다.</Td>
            <Td>24/6/8</Td>
            <Td>확인완료</Td>
          </tr>
          <tr>
            <Td><ProductImage /></Td>
            <Td>상품명입니다.</Td>
            <Td>24/5/3</Td>
            <Td>확인완료</Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PurchaseHistoryPage;
