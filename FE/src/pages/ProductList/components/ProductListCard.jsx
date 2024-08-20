import React from "react";
import * as S from "./productListCard.style";
import { useNavigate } from "react-router-dom";

function ProductListCard(props) {
  const { id, imageSrc, firstTitle, secondTitle, price, onClick } = props;
  // console.log(id, imageSrc, firstTitle, secondTitle, price);

  return (
    <S.Container onClick={() => onClick(id)}>
      <S.Image src={imageSrc} />
      <S.FirstTitle>{firstTitle}</S.FirstTitle>
      <S.SecondTitle>{secondTitle}</S.SecondTitle>
      <S.Price>{new Intl.NumberFormat("ko-KR").format(price) + "원"}</S.Price>
    </S.Container>
  );
}

export default ProductListCard;
