import React from 'react';
import PropTypes from 'prop-types'; 
import styled from 'styled-components';
import { FiBox } from "react-icons/fi";

// Styled-components
const Card = styled.div`
  border: none;
  padding: 0px;
  text-align: center;
  background: #fff;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 180px;
`;

const Image = styled.img`
    max-width: 170px;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover; 
  background-color: #ffffff; 
`;

const Store = styled.h2`
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
  max-width: 200px;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
`;

const DefaultBox = styled(FiBox)`
  max-width: 170px;
  width: 100%;
  height: auto; /* 높이를 자동으로 설정 */
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춤 */
  background-color: #ffffff; 
`;

const ProductCard = ({ image, store, title, price }) => {
  const [imgSrc, setImgSrc] = React.useState(image);

  // Handle image loading errors
  const handleImageError = () => {
    setImgSrc(null); // Set image source to null to show DefaultBox
  };

  const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(price));

  return (
    <Card>
      {imgSrc ? (
        <Image src={imgSrc} onError={handleImageError} alt="Product" />
      ) : (
        <DefaultBox />
      )}
      <Store>{store}</Store>
      <Title>{title}</Title>
      <Title>{formattedPrice}원</Title>
    </Card>
  );
};

// PropTypes definition
ProductCard.propTypes = {
  image: PropTypes.string,
  store: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default ProductCard;
