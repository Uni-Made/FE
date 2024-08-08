import React from 'react';
import PropTypes from 'prop-types'; 
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
const Store = styled.h2`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
  max-width: 200px;

`;

const Title = styled.h2`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
`;

const ProductCard = ({ image, store, title, price }) => (
  <Card>
    <Image src={image} alt={title} />
    <Store>{store}</Store>
    <Title>{title}</Title>
    <Title>{price}</Title>
  </Card>
);

// PropTypes 정의
ProductCard.propTypes = {
  image: PropTypes.string.isRequired, // image는 필수로 문자열이어야 함
  store: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,  // title은 필수로 문자열이어야 함
  price: PropTypes.string.isRequired
};

export default ProductCard;
