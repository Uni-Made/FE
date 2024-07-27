import React, { useEffect, useState } from "react";
import OptionBox from "./components/OptionBox";
import * as S from "./ProductDetailPage.style";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Navbar from "../ProductList/components/Navbar";
import Modal from "./components/Modal";
import DetailBox from "./components/DetailBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../state/purchase/purchaseSlice";

function ProductDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { selectedProduct, getProductDetailsStatus, totalPrice } = useSelector(
    (state) => {
      return state.purchase;
    }
    // {return state.purchase;}와 똑같음
  );
  // modal 제어 함수들
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
    //TODO: 찜 목록 추가/제거 api 적용
  };

  useEffect(() => {
    console.log(productId);
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, getProductDetails]);

  return (
    <>
      <Navbar />
      {getProductDetailsStatus == "fulfilled" && (
        <S.Container>
          <S.TopContainer>
            <S.LeftContainer>
              <S.LeftMainImage
                src={selectedProduct.productImages[0]}
              ></S.LeftMainImage>
              <S.LeftSubBox>
                <S.LeftSubBoxItem
                  src={
                    selectedProduct.productImages[1]
                      ? selectedProduct.productImages[1]
                      : selectedProduct.productImages[0]
                  }
                ></S.LeftSubBoxItem>
                <S.LeftSubBoxItem
                  src={
                    selectedProduct.productImages[2]
                      ? selectedProduct.productImages[2]
                      : selectedProduct.productImages[0]
                  }
                ></S.LeftSubBoxItem>
                <S.LeftSubBoxItem
                  src={
                    selectedProduct.productImages[2]
                      ? selectedProduct.productImages[2]
                      : selectedProduct.productImages[0]
                  }
                ></S.LeftSubBoxItem>
              </S.LeftSubBox>
            </S.LeftContainer>
            <S.RightContainer>
              <S.RightHeader>UNI-MADE</S.RightHeader>
              <S.RightProductName>
                {selectedProduct.productName}
              </S.RightProductName>
              <S.RightDetailBox>
                <S.RightDetailBoxItem>
                  ~{selectedProduct.deadline}
                </S.RightDetailBoxItem>
                <S.RightDetailBoxItem>
                  {selectedProduct.price}원
                </S.RightDetailBoxItem>
              </S.RightDetailBox>
              <S.RightOptionBox>
                <OptionBox></OptionBox>
              </S.RightOptionBox>
              <S.RightPriceBox>
                <S.RightPriceBoxItem onClick={handleHeartClick}>
                  <span>
                    {isHeartFilled ? (
                      <IoMdHeart style={{ color: "red" }} />
                    ) : (
                      <IoMdHeartEmpty />
                    )}
                  </span>
                </S.RightPriceBoxItem>
                <S.RightPriceBoxItem>총 {totalPrice}원</S.RightPriceBoxItem>
              </S.RightPriceBox>
              <S.RightPurchaseButton onClick={handleOpenModal}>
                구매
              </S.RightPurchaseButton>
            </S.RightContainer>
          </S.TopContainer>

          <S.BottomContainer>
            <DetailBox></DetailBox>
          </S.BottomContainer>
          <Modal showModal={showModal} handleClose={handleCloseModal} />
        </S.Container>
      )}
    </>
  );
}

export default ProductDetailPage;
