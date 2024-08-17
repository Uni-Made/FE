import React, { useState } from "react";
import Navbar from "../ProductList/components/Navbar";
import * as S from "./PurchaseFormPage.style";
import PurchaseInput from "./components/PurchaseInput";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  setPurchaseFormData,
  setPurchaseLastInfo,
} from "../../state/purchase/purchaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { authInstance, defaultInstance } from "./../../api/axiosInstance";
import DaumPostcode from "react-daum-postcode";
import AddressBox from "./components/AddressBox";
import AddressModal from "./components/AddressModal";

function PurchaseFormPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const dispatch = useDispatch();
  const { selectedOptions, selectedProduct } = useSelector(
    (state) => state.purchase
  );
  console.log(selectedOptions, selectedProduct);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000)); // form 제출 대기
    alert("구매 요청을 제출합니다");
    const purchaseFormData = {
      name: data.name,
      phoneNumber: data.phoneNum,
      pickupOption: "ONLINE",
      address: data.address,
      detailAddress: data.detailAddress,
      isAgree: data.privacyAgreement,
    };
    const purchaseTotalRequestData = {
      purchaseForm: purchaseFormData,
      orderOptions: selectedOptions.map((option, i) => {
        return {
          optionValueIds: option.valueIds,
          count: option.amount,
        };
      }),
    };
    console.log(purchaseTotalRequestData);

    const response = await authInstance.post(
      "/buyer/orders/" + productId,
      purchaseTotalRequestData
    );
    console.log(response.data.result);
    const purchaseLastInfo = response.data.result;

    dispatch(setPurchaseLastInfo(purchaseLastInfo));
    dispatch(setPurchaseFormData(purchaseFormData));
    navigate(`/product/${productId}/purchase/success`);
  };

  const [isLeftBtnSelected, setIsLeftBtnSelected] = useState(true);

  const handleLeftBtnClick = (e) => {
    e.preventDefault();
    setIsLeftBtnSelected(true);
  };

  const handleRightBtnClick = (e) => {
    e.preventDefault();
    setIsLeftBtnSelected(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nowAddress, setNowAddress] = useState("");
  const handleComplete = (data) => {
    console.log(data.address); // 선택된 주소 확인
    setNowAddress(data.address); // 선택된 주소 처리
    setIsModalOpen(false); // 모달 닫기
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <Navbar />
      <S.HeaderBox>
        <S.HeaderIconBox>
          <S.HeaderBoxIcon></S.HeaderBoxIcon>
        </S.HeaderIconBox>
        <S.HeaderBoxText>구매 폼 작성</S.HeaderBoxText>
      </S.HeaderBox>
      <S.MainBox>
        <PurchaseInput
          id="name"
          placeholder="이름 ex) 이찬민"
          {...register("name", {
            required: "이름은 필수 입력 항목입니다.",
            maxLength: {
              value: 10,
              message: "이름은 최대 10자까지 입력 가능합니다.",
            },
          })}
        />
        {errors.name && (
          <S.MainErrorText>{errors.name.message}</S.MainErrorText>
        )}

        <PurchaseInput
          id="phoneNum"
          placeholder="전화번호 ex) 010-1234-5678"
          maxLength="13"
          {...register("phoneNum", {
            required: "전화번호는 필수 입력 항목입니다.",
            pattern: {
              value: /^\d{3}-\d{3,4}-\d{4}$/,
              message: "전화번호 형식이 올바르지 않습니다.",
            },
          })}
        />
        {errors.phoneNum && (
          <S.MainErrorText>{errors.phoneNum.message}</S.MainErrorText>
        )}

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
        {isLeftBtnSelected ? (
          <>
            {isModalOpen && (
              <AddressModal onClose={closeModal}>
                <DaumPostcode
                  onComplete={(data) => {
                    console.log("data", data);
                    handleComplete(data);
                    closeModal();
                  }}
                />
              </AddressModal>
            )}
            <PurchaseInput
              onClick={openModal}
              placeholder="주소 ex) 경기 성남시 분당구 판교역로 166"
              readOnly
              value={nowAddress}
              {...register("address", {
                required: "주소는 필수 입력 항목입니다.",
              })}
            />
            {errors.address && (
              <S.MainErrorText>{errors.address.message}</S.MainErrorText>
            )}

            <PurchaseInput
              placeholder="상세주소 ex) 푸르지오 3차 403동 604호"
              {...register("detailAddress", {
                required: "상세주소는 필수 입력 항목입니다.",
              })}
            />
            {errors.detailAddress && (
              <S.MainErrorText>{errors.detailAddress.message}</S.MainErrorText>
            )}
          </>
        ) : (
          <>
            <S.MainPickUpBox>
              <div>수령일자 : {"24/08/25"}</div> <br></br>{" "}
              <div>수령장소 : {"상명대"}</div>
            </S.MainPickUpBox>
          </>
        )}

        <S.PrivacyBox>
          <S.PrivacyBoxTerms>
            개인정보 수집 및 이용 약관 내용이 들어갈 자리입니다. 내용을
            채워주세요. ...
          </S.PrivacyBoxTerms>
          <S.PrivacyToggleBox>
            <input
              type="checkbox"
              {...register("privacyAgreement", {
                required: "개인정보 수집 및 이용에 동의해야 합니다.",
              })}
            />
            <div>개인정보 수집 및 이용에 동의합니다.</div>
          </S.PrivacyToggleBox>
        </S.PrivacyBox>
        {errors.privacyAgreement && <p>{errors.privacyAgreement.message}</p>}

        <S.PurchaseButton type="submit" disabled={isSubmitting}>
          구매하기
        </S.PurchaseButton>
      </S.MainBox>
    </S.Container>
  );
}

export default PurchaseFormPage;
