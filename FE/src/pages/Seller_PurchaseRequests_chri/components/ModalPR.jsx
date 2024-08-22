import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 모달이 항상 가장 위에 표시되도록 높은 z-index 설정 */
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 50px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
  position: relative; 
  height: 420px;
font-size: 20px;
`;

const ModalButton = styled.button`
  background-color: #FF0099;
  color: #fff;
  border: none;
  padding: 15px 25px;
  margin: 10px;
  margin-top: 20px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 1px solid #FF0099;
    color: #FF0099;
    font-weight:bold;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 35px;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;
  margin-bottom: 10px;
`;

const Modal = ({ item, onClose, onChangeStatus }) => {
  const { productImage, productName, orderStatus, orderId } = item;

  const handleButtonClick = (newStatus) => {
    onChangeStatus(newStatus);
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ProductImage src={productImage}/>
        <h3>{productName}</h3>
        <p>주문 ID: {orderId}</p>
        <br></br>
        {orderStatus === 'PENDING' && (
          <>
            <p>상품의 입금을 확인하시겠습니까?</p>
            <ModalButton onClick={() => handleButtonClick('PAID')}>입금확인</ModalButton>
            <ModalButton onClick={() => handleButtonClick('CANCELLED')}>주문취소</ModalButton>
          </>
        )}
        {orderStatus === 'PAID' && (
          <>
            <p>상품의 수령을 완료하시겠습니까?</p>
            <ModalButton onClick={() => handleButtonClick('RECEIVED')}>수령완료</ModalButton>
            <ModalButton onClick={() => handleButtonClick('CANCELLED')}>주문취소</ModalButton>
          </>
        )}
        {orderStatus === 'RECEIVED' && (
          <p>이 주문은 수령 완료된 주문입니다.</p>
        )}
        {orderStatus === 'CANCELLED' && (
          <p>이 주문은 취소된 주문입니다.</p>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

Modal.propTypes = {
  item: PropTypes.shape({
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
    orderId: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};

export default Modal;
