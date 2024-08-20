import React from 'react';
import PropTypes from 'prop-types'; 
import styled from 'styled-components';
// import personIcon from '../../../../public/personIcon.png'; 
import { IoPersonSharp } from "react-icons/io5";
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
  height: auto; /* 높이를 자동으로 설정 */
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춤 */
  background-color: #ffffff; 
`;
const ProfileIcon = styled(IoPersonSharp)`

  max-width: 170px;
  width: 100%;
  height: auto; /* 높이를 자동으로 설정 */
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  object-fit: cover; /* 이미지 비율을 유지하며 컨테이너에 맞춤 */
  background-color: #ffffff; /* 이미지가 없을 경우 배경색 */
`;

const Title = styled.h2`
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 100;
`;

const ProductCard = ({ image, mader }) => {
  const [imgSrc, setImgSrc] = React.useState(image);

  // Handle image loading error
  const handleImageError = () => {
    setImgSrc(null); // Set image source to null to show the ProfileIcon
  };

  return (
    <Card>
      {imgSrc ? (
        <Image src={imgSrc} onError={handleImageError}/>
      ) : (
        <ProfileIcon />
      )}
      <Title>{mader}</Title>
    </Card>
  );
};
ProductCard.propTypes = {
  image: PropTypes.string, // image는 선택 사항
  mader: PropTypes.string.isRequired,  // mader는 필수로 문자열이어야 함
};

export default ProductCard;
