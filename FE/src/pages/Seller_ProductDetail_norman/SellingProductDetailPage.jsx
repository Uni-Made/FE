import React, { useEffect, useState } from "react";
import { authInstance } from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../state/purchase/purchaseSlice";
import DetailBox from "./components/DetailBox";
import Navbar from "../Main/components/Header";
import Modal from "../ProductDetail/components/Modal";
import OptionBox from "../ProductDetail/components/OptionBox";
import * as S from "./SellingProductDetailPage.style";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Header from "./../SignUp/SignUpHeader";
import QnaManageBox from "./components/QnaManageBox";

function SellingProductDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, getProductDetailsStatus, totalPrice } = useSelector(
    (state) => state.purchase
    // {return state.purchase;}와 똑같음
  );

  // react-slider pause on hover셋팅
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
  };

  // modal 제어 함수들
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleHeartClick = async () => {
    const result = await authInstance.post(
      "/buyer/product/favorite/" + productId
    );
    if (result.data.message == "좋아요 성공") {
      setIsHeartFilled(true);
    } else if (result.data.message == "좋아요 취소") {
      setIsHeartFilled(false);
    }
  };

  const handleSellerNameClick = () => {
    navigate(`/maderMyPage`);
  };

  useEffect(() => {
    console.log("getproductDetail호출", productId);
    dispatch(getProductDetails(productId));
  }, [productId, getProductDetails]);

  return (
    <>
      <Navbar />
      {/* <Header /> */}
      {getProductDetailsStatus == "fulfilled" && (
        <S.Container>
          <S.TopContainer>
            <S.LeftContainer>
              <S.LeftMainImage
                src={selectedProduct.productImages[0]}
              ></S.LeftMainImage>
              <S.LeftSubBox {...settings}>
                {selectedProduct.productImages.map((img, idx) => (
                  <S.LeftSubBoxItem key={idx} src={img}></S.LeftSubBoxItem>
                ))}
              </S.LeftSubBox>
            </S.LeftContainer>
            <S.RightContainer>
              <S.RightHeader>
                <div onClick={handleSellerNameClick}>
                  {selectedProduct.sellerName}
                </div>
              </S.RightHeader>
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
              <S.RightPurchaseButton
                type="modify"
                onClick={() => navigate("/maderMyPage/product/modify")}
              >
                수정
              </S.RightPurchaseButton>
              <S.RightPurchaseButton
                type="check"
                onClick={() => navigate("/maderMyPage/purchase/requests")}
              >
                구매 요청 확인
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
export default SellingProductDetailPage;
