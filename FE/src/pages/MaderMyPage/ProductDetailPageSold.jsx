import React, { useState } from 'react';
import {
  OUTER_CONTAINER,
  CONTAINER,
  PRODUCT_CONTAINER,
  PRODUCT_IMAGE,
  PRODUCT_DETAILS,
  PRODUCT_NAME,
  PRODUCT_SUB_INFO,
  PRODUCT_PRICE,
  BUTTON,
  TAB_CONTAINER,
  TAB,
  TAB_CONTENT,
  BUTTON_CONTAINER,
  SELECT,
  IMAGE_SCROLL_CONTAINER,
  SMALL_PRODUCT_IMAGE
} from './ProductDetailPage.style';

const ProductDetailPageSold = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [mainImage, setMainImage] = useState('default_image_url'); // 기본 이미지 URL로 대체
  const [activeImage, setActiveImage] = useState('default_image_url');

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
    setActiveImage(imageUrl);
  };

  return (
    <OUTER_CONTAINER>
      <CONTAINER>
        <PRODUCT_CONTAINER>
          <PRODUCT_IMAGE imageUrl={mainImage} />
          <PRODUCT_DETAILS>
            <PRODUCT_NAME>연세 하키티</PRODUCT_NAME>
            <PRODUCT_SUB_INFO>판매 종료</PRODUCT_SUB_INFO>
            <PRODUCT_PRICE>29,000원</PRODUCT_PRICE>
            <SELECT>
              <option>옵션 1 확인</option>
            </SELECT>
            <SELECT>
              <option>옵션 2 확인</option>
            </SELECT>
            <BUTTON_CONTAINER>
              <BUTTON disabled>수정</BUTTON>
              <BUTTON>판매 재등록</BUTTON>
            </BUTTON_CONTAINER>
          </PRODUCT_DETAILS>
        </PRODUCT_CONTAINER>
        <IMAGE_SCROLL_CONTAINER>
          <SMALL_PRODUCT_IMAGE 
            imageUrl="image_url_1" 
            active={activeImage === 'image_url_1'}
            onClick={() => handleImageClick('image_url_1')} 
          />
          <SMALL_PRODUCT_IMAGE 
            imageUrl="image_url_2" 
            active={activeImage === 'image_url_2'}
            onClick={() => handleImageClick('image_url_2')} 
          />
          <SMALL_PRODUCT_IMAGE 
            imageUrl="image_url_3" 
            active={activeImage === 'image_url_3'}
            onClick={() => handleImageClick('image_url_3')} 
          />
        </IMAGE_SCROLL_CONTAINER>
        <TAB_CONTAINER>
          <TAB
            active={activeTab === 'details'}
            first
            onClick={() => setActiveTab('details')}
          >
            상세정보
          </TAB>
          <TAB
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            리뷰
          </TAB>
          <TAB
            active={activeTab === 'qa'}
            last
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </TAB>
        </TAB_CONTAINER>
        <TAB_CONTENT>
          {activeTab === 'details' && <div>상세 정보 내용</div>}
          {activeTab === 'reviews' && <div>리뷰 내용</div>}
          {activeTab === 'qa' && <div>Q&A 내용</div>}
        </TAB_CONTENT>
      </CONTAINER>
    </OUTER_CONTAINER>
  );
};

export default ProductDetailPageSold;
