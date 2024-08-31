import React, { useEffect, useState } from "react";
import OptionBox from "./components/OptionBox";
import * as S from "./ProductDetailPage.style";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Navbar from "../ProductList/components/Navbar";
import Modal from "./components/Modal";
import DetailBox from "./components/DetailBox";
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  setSelectedProduct,
} from "../../state/purchase/purchaseSlice";
import { defaultInstance, authInstance } from "../../api/axiosInstance";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import DetailReviewBox from "./components/DetailBox_components/DetailReviewBox";

async function getFavoriteProducts() {
  const apiResponse = await authInstance.get(
    "/buyer/favorite-products?pageSize=100"
  );
  console.log(apiResponse);
  return apiResponse.data.result.favoriteProducts;
}

function ProductDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { productId } = useParams();
  const location = useLocation();
  console.log(location);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    selectedProduct,
    getProductDetailsStatus,
    totalPrice,
    selectedOptions,
  } = useSelector(
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

  // modal 제어 함수들
  const handleOpenModal = () => {
    if (selectedOptions.length == 0) {
      alert("구매할 상품 옵션을 선택하세요.");
      return;
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleHeartClick = async (isChecked) => {
    const result = await authInstance.post(
      "/buyer/product/favorite/" + productId
    );
    if (!isChecked && result.data.message == "좋아요 성공") {
      console.log(1);
      setIsHeartFilled(true);
    } else if (isChecked && result.data.message == "좋아요 취소") {
      console.log(2);
      setIsHeartFilled(false);
    }
  };

  const handleSellerNameClick = () => {
    navigate(`/maderHome/${selectedProduct.sellerId}`);
  };

  useEffect(() => {
    console.log("getproductDetail호출", productId);
    const userType = localStorage.getItem("usertype");
    dispatch(getProductDetails({ productId, userType }));
  }, [productId, getProductDetails]);

  useEffect(() => {
    async function fetchNowProductIsFavoriteCheck() {
      const funcResponse = await getFavoriteProducts();
      const isFavorite = funcResponse.some(
        (product) => product.productId == productId
      );
      if (isFavorite) {
        setIsHeartFilled(true);
      } else {
        setIsHeartFilled(false);
      }
    }
    fetchNowProductIsFavoriteCheck();
  }, [productId]);

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
                  {new Intl.NumberFormat("ko-KR").format(selectedProduct.price)}
                  원
                </S.RightDetailBoxItem>
              </S.RightDetailBox>
              <S.RightOptionBox>
                <OptionBox></OptionBox>
              </S.RightOptionBox>
              <S.RightPriceBox>
                <S.RightPriceBoxItem
                  onClick={() => handleHeartClick(isHeartFilled)}
                >
                  <span>
                    {isHeartFilled ? (
                      <IoMdHeart
                        style={{
                          color: "#4cd5d5",
                        }}
                      />
                    ) : (
                      <IoMdHeartEmpty
                        style={{
                          strokeWidth: "0.1", // 선의 두께를 변경
                        }}
                      />
                    )}
                  </span>
                </S.RightPriceBoxItem>
                <S.RightPriceBoxItem>
                  총 {new Intl.NumberFormat("ko-KR").format(totalPrice)}원
                </S.RightPriceBoxItem>
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
