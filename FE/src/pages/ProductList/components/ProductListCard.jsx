import React from "react";
import * as S from "./productListCard.style";
import { useNavigate } from "react-router-dom";

function ProductListCard(props) {
  const { id, imageSrc, firstTitle, secondTitle, price } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <S.Container onClick={handleClick}>
      <S.Image src={imageSrc} />
      <S.FirstTitle>{firstTitle}</S.FirstTitle>
      <S.SecondTitle>{secondTitle}</S.SecondTitle>
      <S.Price>{price}</S.Price>
    </S.Container>
  );
}

export default ProductListCard;
