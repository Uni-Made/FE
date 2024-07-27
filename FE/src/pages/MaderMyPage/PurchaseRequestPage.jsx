import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
`;

const CloseButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  margin-top: 20px;

  &:hover {
    background-color: #ff1493;
  }
`;

const PurchaseRequestModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>구매요청 확인</h2>
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
              <Td><img src="상품 이미지 URL" alt="상품 이미지" width="50" height="50" /></Td>
              <Td>상품명입니다.</Td>
              <Td>24/7/14</Td>
              <Td>대기중</Td>
            </tr>
            <tr>
              <Td><img src="상품 이미지 URL" alt="상품 이미지" width="50" height="50" /></Td>
              <Td>상품명입니다.</Td>
              <Td>24/7/14</Td>
              <Td>대기중</Td>
            </tr>
            <tr>
              <Td><img src="상품 이미지 URL" alt="상품 이미지" width="50" height="50" /></Td>
              <Td>상품명입니다.</Td>
              <Td>24/7/14</Td>
              <Td>대기중</Td>
            </tr>
          </tbody>
        </Table>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PurchaseRequestModal;
