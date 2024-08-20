import React from "react";
import * as S from "./PurchaseFormSuccessPage.style";
import Navbar from "../ProductList/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PurchaseFormSuccessPage() {
  const navigate = useNavigate();
  const { selectedProduct, purchaseFormData, purchaseLastInfo } = useSelector(
    (state) => state.purchase
  );
  console.log(selectedProduct, purchaseFormData, purchaseLastInfo);
  const handleClickReturnBtn = () => {
    navigate("/product/list");
  };
  return (
    <>
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
            <span>
              {purchaseLastInfo.bankName + " "}
              {purchaseLastInfo.accountNumber + " "}
              {purchaseLastInfo.accountName}{" "}
            </span>{" "}
            로 입금해주시기 바랍니다.
          </p>
          <p>2일 내 미입금시 구매 요청이 취소될 수 있습니다.</p>
        </S.MainBox>
        <S.ReturnButton onClick={handleClickReturnBtn}>
          계속 쇼핑하기
        </S.ReturnButton>
      </S.Container>
    </>
  );
}

export default PurchaseFormSuccessPage;
