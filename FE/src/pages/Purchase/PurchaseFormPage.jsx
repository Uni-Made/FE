import React from "react";
import Navbar from "../ProductList/components/Navbar";
import * as S from "./PurchaseFormPage.style";
import Input from "./components/Input";

function PurchaseFormPage() {
  const handleButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <S.Container>
      <Navbar />
      <S.HeaderBox>
        <S.HeaderIconBox>
          <S.HeaderBoxIcon></S.HeaderBoxIcon>
        </S.HeaderIconBox>
        <S.HeaderBoxText>구매 폼 작성</S.HeaderBoxText>
      </S.HeaderBox>
      <S.MainBox>
        <Input Placeholder={"이름"} />
        <Input Placeholder={"전화번호"} />
        <S.MainToggleBox>
          <S.MainToggleBoxButton onClick={handleButtonClick}>
            온라인 수령
          </S.MainToggleBoxButton>
          <S.MainToggleBoxButton onClick={handleButtonClick}>
            오프라인 수령
          </S.MainToggleBoxButton>
        </S.MainToggleBox>
        <Input Placeholder={"주소"} />
        <Input Placeholder={"상세주소"} />
        <S.MainErrorText></S.MainErrorText>
        <S.PrivacyBox>
          <S.PrivacyToggleBox></S.PrivacyToggleBox>
        </S.PrivacyBox>
        <S.PurchaseButton>구매하기</S.PurchaseButton>
      </S.MainBox>
    </S.Container>
  );
}

export default PurchaseFormPage;
