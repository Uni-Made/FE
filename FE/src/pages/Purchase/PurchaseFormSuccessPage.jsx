import React from "react";
import * as S from "./PurchaseFormSuccessPage.style";
import Navbar from "../ProductList/components/Navbar";
import { useNavigate } from "react-router-dom";

function PurchaseFormSuccessPage() {
  const navigate = useNavigate();

  const handleClickReturnBtn = () => {
    navigate("/");
  };
  return (
    <S.Container>
      <Navbar />
      <S.HeaderBox>
        <S.HeaderIconBox>
          <S.HeaderBoxIcon>3</S.HeaderBoxIcon>
        </S.HeaderIconBox>
        <S.HeaderBoxText>구매 요청 완료</S.HeaderBoxText>
      </S.HeaderBox>
      <S.MainBox>
        <p>구매 요청이 메이더에게 전달 완료되었습니다.</p>
        <p>
          <span>우리 1002-000-0000000 남의서, 입금자명 박시원 58,000원</span>{" "}
          입금해주시기 바랍니다.
        </p>
        <p>2일 내 미입금시 구매 요청이 취소될 수 있습니다.</p>
      </S.MainBox>
      <S.ReturnButton onClick={handleClickReturnBtn}>
        메인으로 돌아가기
      </S.ReturnButton>
    </S.Container>
  );
}

export default PurchaseFormSuccessPage;
