import React, { useState, useEffect } from 'react';
import MaderHomeHeader from "./components/MaderHomeHeader";
import {
  CONTAINER,
  SECTION_CONTAINER,
  SECTION_TITLE,
  ITEM_CONTAINER,
  PRODUCT_CARD,
  PRODUCT_DETAILS,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  GRID_WRAPPER,
  MainContainer,
  PRODUCT_ID,
} from './SoldoutProductsListPage.style';

const renderProductList = (title, products) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>
        {title}
      </SECTION_TITLE>
      <GRID_WRAPPER>
        {products.map((product) => (
          <ITEM_CONTAINER key={product.productId}>
            <PRODUCT_CARD
              style={{ 
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none', 
                backgroundColor: '#f0f0f0', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }} 
            />
            <PRODUCT_DETAILS>
              <PRODUCT_ID>{product.productId}</PRODUCT_ID>
              <PRODUCT_NAME>{product.name}</PRODUCT_NAME>
              <PRODUCT_PRICE>{product.price.toLocaleString()}원</PRODUCT_PRICE>
            </PRODUCT_DETAILS>
          </ITEM_CONTAINER>
        ))}
      </GRID_WRAPPER>
    </SECTION_CONTAINER>
  );
};

const SoldoutProductsListPage = () => {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {

    const mockData = {
      totalElements: 6,
      totalPages: 1,
      size: 6,
      content: [
        { productId: 1, name: '상품 1', price: 10000, imageUrl: 'https://example.com/image1.jpg' },
        { productId: 2, name: '상품 2', price: 20000, imageUrl: 'https://example.com/image2.jpg' },
        { productId: 3, name: '상품 3', price: 30000, imageUrl: 'https://example.com/image3.jpg' },
        { productId: 4, name: '상품 4', price: 40000, imageUrl: 'https://example.com/image4.jpg' },
        { productId: 5, name: '상품 5', price: 50000, imageUrl: 'https://example.com/image5.jpg' },
        { productId: 6, name: '상품 6', price: 60000, imageUrl: 'https://example.com/image6.jpg' },
      ],
      number: 0,
      sort: [
        {
          direction: "ASC",
          nullHandling: "NATIVE",
          ascending: true,
          property: "name",
          ignoreCase: false
        }
      ],
      numberOfElements: 6,
      pageable: {
        pageNumber: 0,
        offset: 0,
        sort: [
          {
            direction: "ASC",
            nullHandling: "NATIVE",
            ascending: true,
            property: "name",
            ignoreCase: false
          }
        ],
        pageSize: 6,
        paged: true,
        unpaged: false
      },
      first: true,
      last: true,
      empty: false
    };

    setSellerData({
      ...mockData,
      sellingProducts: mockData.content, 
    });
  }, []);

  if (!sellerData) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      
      <MaderHomeHeader />
      <CONTAINER>
        {renderProductList('판매 종료된 상품', sellerData.sellingProducts)}
      </CONTAINER>
    </MainContainer>
  );
};

export default SoldoutProductsListPage;
