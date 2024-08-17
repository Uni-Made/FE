import React, { useEffect, useState } from "react";
import { defaultInstance } from "./../../api/axiosInstance";
import { useParams } from "react-router-dom";
import Navbar from "../ProductList/components/Navbar";
import * as S from "./SoldoutProductDetailPage.style";
import DetailBox from "../ProductDetail/components/DetailBox";
import OptionBox from "../ProductDetail/components/OptionBox";

// detialbox 컴포넌트 그대로 가져와서 씀, qna만 item에서 입력하는 블럭하나 빼기
// detail 페이지에서는 옵션박스 카드만드는 거 제외, 구매하기 버튼 대신에 상품상세정보 수정버튼이랑 구매요청확인 버튼 만들기

async function getSoldoutProductDetail(productId) {
  try {
    const response = await defaultInstance.get(
      "/api/products/" + productId + "?viewType=DETAIL"
    );
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching product : soldout", error);
  }
}

function SoldoutProductDetailPage() {
  const { productId } = useParams();
  const [soldoutProductDetails, setSoldoutProductDetail] = useState();
  const [apiStatus, setApiStatus] = useState("pending");

  // const { selectedProduct, getProductDetailsStatus, totalPrice } = useSelector(
  //   (state) => state.purchase
  //   // {return state.purchase;}와 똑같음
  // );

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

  useEffect(() => {
    async function fetchProductDetail() {
      const productDetail = await getSoldoutProductDetail(productId);
      setSoldoutProductDetail(productDetail);
      console.log(productDetail);
      setApiStatus("fulfilled");
    }

    fetchProductDetail();
  }, []);

  return (
    apiStatus === "fulfilled" && (
      <>
        <Navbar />
        <S.Container>
          <S.TopContainer>
            <S.LeftContainer>
              <S.LeftMainImage
                src={soldoutProductDetails.productImages[0]}
              ></S.LeftMainImage>
              <S.LeftSubBox {...settings}>
                {soldoutProductDetails.productImages.map((img, idx) => (
                  <S.LeftSubBoxItem key={idx} src={img}></S.LeftSubBoxItem>
                ))}
              </S.LeftSubBox>
            </S.LeftContainer>
            <S.RightContainer>
              <S.RightHeader>UNI-MADE</S.RightHeader>
              <S.RightProductName>
                {soldoutProductDetails.productName}
              </S.RightProductName>
              <S.RightDetailBox>
                <S.RightDetailBoxItem>
                  ~{soldoutProductDetails.deadline}
                </S.RightDetailBoxItem>
                <S.RightDetailBoxItem>
                  {soldoutProductDetails.price}원
                </S.RightDetailBoxItem>
              </S.RightDetailBox>
              <S.RightOptionBox>
                {/* <OptionBox></OptionBox> */}
              </S.RightOptionBox>
              <S.RightPriceBox>
                {/* <S.RightPriceBoxItem onClick={handleHeartClick}>
                <span>
                  {isHeartFilled ? (
                    <IoMdHeart style={{ color: "red" }} />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </span>
              </S.RightPriceBoxItem> */}
                {/* <S.RightPriceBoxItem>총 {totalPrice}원</S.RightPriceBoxItem> */}
              </S.RightPriceBox>
              <S.RightPurchaseButton>수정</S.RightPurchaseButton>
              <S.RightPurchaseButton>구매요청 확인</S.RightPurchaseButton>
            </S.RightContainer>
          </S.TopContainer>
          <S.BottomContainer>
            <DetailBox></DetailBox>
          </S.BottomContainer>
          {/* <Modal showModal={showModal} handleClose={handleCloseModal} /> */}
        </S.Container>
      </>
    )
  );
}

export default SoldoutProductDetailPage;
