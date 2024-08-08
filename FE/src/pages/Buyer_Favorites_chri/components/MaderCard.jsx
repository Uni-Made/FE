import React from 'react';
import PropTypes from 'prop-types'; // PropTypes 추가
import styled from 'styled-components';

const Card = styled.div`
  border: none;
  padding: 10px;
  text-align: center;
  background: #fff;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  @media (max-width: 648px) {
    padding: 5px;
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const Title = styled.h2`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
`;

const ProductCard = ({ image, mader}) => (
  <Card>
    <Image src={image} alt={mader} />
    <Title>{mader}</Title>
  </Card>
);

ProductCard.propTypes = {
  image: PropTypes.string.isRequired, // image는 필수로 문자열이어야 함
  mader: PropTypes.string.isRequired,  // mader 필수로 문자열이어야 함
};

export default ProductCard;
