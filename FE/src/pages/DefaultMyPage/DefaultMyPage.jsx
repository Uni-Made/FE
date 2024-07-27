import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import {
  CONTAINER,
  PROFILE_CONTAINER,
  PROFILE_IMAGE,
  PROFILE_NAME,
  PROFILE_LINK,
  SETTINGS_ICON,
  SECTION_CONTAINER,
  SECTION_TITLE,
  ITEM_CONTAINER,
  PRODUCT_CARD,
  PRODUCT_DETAILS,
  SHOP_NAME,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  ARROW
} from './DefaultMyPage.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <ARROW className={className} onClick={onClick}>
      ➡️
    </ARROW>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <ARROW className={className} onClick={onClick}>
      ⬅️
    </ARROW>
  );
};

const renderProductList = (title, isMaiders = false) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <Slider {...settings}>
        {[...Array(10)].map((_, index) => (
          <ITEM_CONTAINER key={index}>
            <PRODUCT_CARD />
            <PRODUCT_DETAILS>
              {!isMaiders && <SHOP_NAME>상점</SHOP_NAME>}
              <PRODUCT_NAME>제품 이름입니다</PRODUCT_NAME>
              {!isMaiders && <PRODUCT_PRICE>29,000원</PRODUCT_PRICE>}
            </PRODUCT_DETAILS>
          </ITEM_CONTAINER>
        ))}
      </Slider>
    </SECTION_CONTAINER>
  );
};

const DefaultMyPage = () => {
  const navigate = useNavigate();

  const handlePurchaseHistory = () => {
    navigate('/purchase-history');
  };

  const handleMemberInfoEdit = () => {
    navigate('/update-info');
  };

  return (
    <CONTAINER>
      <PROFILE_CONTAINER>
        <PROFILE_IMAGE />
        <div>
          <PROFILE_NAME>박시원</PROFILE_NAME>
          <div>
            <PROFILE_LINK onClick={handlePurchaseHistory}>구매내역</PROFILE_LINK>|{'   '}
            <PROFILE_LINK onClick={handleMemberInfoEdit}>회원정보 수정</PROFILE_LINK>
          </div>
        </div>
        <SETTINGS_ICON>⚙️</SETTINGS_ICON>
      </PROFILE_CONTAINER>
      {renderProductList('찜한 상품')}
      {renderProductList('찜한 메이더', true)}
    </CONTAINER>
  );
};

export default DefaultMyPage;
