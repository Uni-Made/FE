import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import {
  CONTAINER,
  PROFILE_CONTAINER,
  PROFILE_IMAGE,
  PROFILE_NAME,
  ADD_PRODUCT_BUTTON,
  SETTINGS_ICON,
  SECTION_CONTAINER,
  SECTION_TITLE,
  ITEM_CONTAINER,
  PRODUCT_CARD,
  PRODUCT_DETAILS,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  ARROW
} from './MaderMyPage.style';
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

const renderProductList = (title, isSoldOut, navigate) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const onClickProduct = (product) => {
    if (isSoldOut) {
      navigate('/product-detail-solded', { state: { product } });
    } else {
      navigate('/product-detail-sell', { state: { product } });
    }
  };

  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>
        {title}
        <span style={{ fontSize: '12px', marginLeft: '10px', color: '#aaa' }}>자세히 보기</span>
      </SECTION_TITLE>
      <Slider {...settings}>
        {[...Array(8)].map((_, index) => (
          <ITEM_CONTAINER key={index} onClick={() => onClickProduct({ title: '연세 하키티', price: 29000 })}>
            <PRODUCT_CARD />
            <PRODUCT_DETAILS>
              <PRODUCT_NAME>제품 이름입니다</PRODUCT_NAME>
              <PRODUCT_PRICE>29,000원</PRODUCT_PRICE>
            </PRODUCT_DETAILS>
          </ITEM_CONTAINER>
        ))}
      </Slider>
    </SECTION_CONTAINER>
  );
};

const MaderMyPage = () => {
  const navigate = useNavigate();

  return (
    <CONTAINER>
      <PROFILE_CONTAINER>
        <PROFILE_IMAGE />
        <div>
          <PROFILE_NAME>Mader Name</PROFILE_NAME>
          <ADD_PRODUCT_BUTTON>새로운 상품 등록하기</ADD_PRODUCT_BUTTON>
        </div>
        <SETTINGS_ICON>⚙️</SETTINGS_ICON>
      </PROFILE_CONTAINER>
      {renderProductList('판매 중인 상품', false, navigate)}
      {renderProductList('판매 종료된 상품', true, navigate)}
    </CONTAINER>
  );
};

export default MaderMyPage;
