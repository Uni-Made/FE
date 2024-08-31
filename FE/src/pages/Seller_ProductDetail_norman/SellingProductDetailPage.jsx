import React, { useEffect, useState } from "react";
import { authInstance } from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../state/purchase/purchaseSlice";
import DetailBox from "./components/DetailBox";
import Navbar from "../ProductList/components/Navbar";
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
    arrows: false, // 이 부분 추가
  };

  useEffect(() => {
    console.log("getproductDetail호출", productId);
    const userType = localStorage.getItem("userType");
    console.log(userType);
    dispatch(getProductDetails({ productId, userType }));
  }, [productId, getProductDetails]);

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
              <S.LeftSubBox {...settings}>
                {selectedProduct.productImages.map((img, idx) => (
                  <S.LeftSubBoxItem key={idx} src={img}></S.LeftSubBoxItem>
                ))}
              </S.LeftSubBox>
            </S.LeftContainer>
            <S.RightContainer>
              <S.RightHeader>
                <div>{selectedProduct.sellerName}</div>
              </S.RightHeader>
              <S.RightProductName>
                {selectedProduct.productName}
              </S.RightProductName>
              <S.RightDetailBox>
                <S.RightDetailBoxItem>
                  ~{selectedProduct.deadline}
                </S.RightDetailBoxItem>
                <S.RightDetailBoxItem>
                  {new Intl.NumberFormat("ko-KR").format(selectedProduct.price)}
                  원
                </S.RightDetailBoxItem>
              </S.RightDetailBox>
              <S.RightOptionBox>
                <OptionBox></OptionBox>
              </S.RightOptionBox>
              <S.RightPurchaseButton
                type="modify"
                onClick={() =>
                  navigate("/maderMyPage/product/modify/" + productId)
                }
              >
                수정
              </S.RightPurchaseButton>
              <S.RightPurchaseButton
                type="check"
                onClick={() =>
                  navigate("/maderMyPage/purchase/requests/" + productId)
                }
              >
                구매 요청 확인
              </S.RightPurchaseButton>
            </S.RightContainer>
          </S.TopContainer>
          <S.BottomContainer>
            <DetailBox></DetailBox>
          </S.BottomContainer>
        </S.Container>
      )}
    </>
  );
}
export default SellingProductDetailPage;
