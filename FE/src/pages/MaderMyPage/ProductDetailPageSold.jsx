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
  BUTTON_GRAY,
  TAB_CONTAINER,
  TAB,
  TAB_CONTENT
} from './ProductDetailPage.style';

const ProductDetailPageSold = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [mainImage, setMainImage] = useState(null);

  return (
    <OUTER_CONTAINER>
      <CONTAINER>
        <PRODUCT_CONTAINER>
          <PRODUCT_IMAGE style={{ backgroundColor: mainImage }} />
          <PRODUCT_DETAILS>
            <PRODUCT_NAME>연세 하키티</PRODUCT_NAME>
            <PRODUCT_SUB_INFO>판매 종료</PRODUCT_SUB_INFO>
            <PRODUCT_PRICE>29,000원</PRODUCT_PRICE>
            <select>
              <option>옵션 1 확인</option>
            </select>
            <select>
              <option>옵션 2 확인</option>
            </select>
            <BUTTON_GRAY>수정</BUTTON_GRAY>
            <BUTTON>판매 재등록</BUTTON>
          </PRODUCT_DETAILS>
        </PRODUCT_CONTAINER>
        <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px' }}>
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px', backgroundColor: '#0019f4' }} onClick={() => setMainImage('#0019f4')} />
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px', backgroundColor: '#0a3711' }} onClick={() => setMainImage('#0a3711')} />
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px', backgroundColor: '#d1180b' }} onClick={() => setMainImage('#d1180b')} />
        </div>
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
