import React, { useState } from "react";
import Navbar from "../ProductList/components/Navbar";
import * as S from "./PurchaseFormPage.style";
import Input from "./components/Input";
import { useNavigate, useParams } from "react-router-dom";

function PurchaseFormPage() {
  const navigate = useNavigate();
  const {params} = useParams();
  const [isErrors, setIsErrors] = useState({
    name: true,
    phoneNumber: true,
    address: true,
    detailAddress: true,
  });
  // TODO: 위 4개 영역 유효성 검사 로직 함수 작성 + 각 input change로 적용
  const [isLeftBtnSelected, setIsLeftBtnSelected] = useState(true);

  const handleLeftBtnClick = (e) => {
    e.preventDefault();
    setIsLeftBtnSelected(true);
  };

  const handleRightBtnClick = (e) => {
    e.preventDefault();
    setIsLeftBtnSelected(false);
  };

  const handlePurchaseBtnClick = (e) => {
    e.preventDefault();
    // TODO: purchase API 요청 로직
    navigate("/product/:" + params + "/purchase/success"); 
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
          <S.MainToggleBoxButton
            onClick={handleLeftBtnClick}
            isSelected={isLeftBtnSelected}
          >
            온라인 수령
          </S.MainToggleBoxButton>
          <S.MainToggleBoxButton
            onClick={handleRightBtnClick}
            isSelected={!isLeftBtnSelected}
          >
            오프라인 수령
          </S.MainToggleBoxButton>
        </S.MainToggleBox>
        <Input Placeholder={"주소"} />
        <Input Placeholder={"상세주소"} />
        <S.MainErrorText>주소와 상세주소를 입력해주세요.</S.MainErrorText>
        <S.PrivacyBox>
          <S.PrivacyBoxTerms>
            개인정보 수집 및 이용 약관 내용이 들어갈 자리입니다. 내용을
            채워주세요. 개인정보 수집 및 이용 약관 내용이 들어갈 자리입니다.
            내용을 채워주세요. 개인정보 수집 및 이용 약관 내용이 들어갈
            자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용 약관 내용이
            들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용 약관
            내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용
            약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및
            이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집
            및 이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보
            수집 및 이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요.
            개인정보 수집 및 이용 약관 내용이 들어갈 자리입니다. 내용을
            채워주세요. 개인정보 수집 및 이용 약관 내용이 들어갈 자리입니다.
            내용을 채워주세요. 개인정보 수집 및 이용 약관 내용이 들어갈
            자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용 약관 내용이
            들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용 약관
            내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및 이용
            약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집 및
            이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보 수집
            및 이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요. 개인정보
            수집 및 이용 약관 내용이 들어갈 자리입니다. 내용을 채워주세요.
          </S.PrivacyBoxTerms>
          <S.PrivacyToggleBox>
            <input type="checkbox" />
            <div>개인정보 수집 및 이용에 동의합니다.</div>
          </S.PrivacyToggleBox>
        </S.PrivacyBox>
        <S.PurchaseButton onClick={handlePurchaseBtnClick}>구매하기</S.PurchaseButton>
      </S.MainBox>
    </S.Container>
  );
}

export default PurchaseFormPage;
