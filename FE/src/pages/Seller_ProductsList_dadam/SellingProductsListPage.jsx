import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer'; 
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
  Containersum,
} from './SellingProductsListPage.style';

const renderProductList = (title, products) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <GRID_WRAPPER>
        {products.map((product) => (
          <ITEM_CONTAINER key={product.productId}>
            <PRODUCT_CARD
              style={{
                backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                backgroundColor: '#f0f0f0',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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

const fetchProducts = async (page, setSellerData, setHasMore) => {
  console.log('Fetching page:', page);
  try {
    const response = await fetch(`http://15.165.185.157:8080/seller/myPage/sellingProducts?page=${page}&size=12`, {
      method: 'GET',
      headers: {
        accept: 'application/json;charset=UTF-8',
        Authorization: `Bearer ${import.meta.env.SELLER_API_TEST_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    setSellerData((prevData) => [...prevData, ...data.content]);

    if (data.last) {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const SellingProductsListPage = () => {
  const [sellerData, setSellerData] = useState([]);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 1.0, 
  });

  const fetchData = useCallback(async () => {
    if (hasMore) {
      await fetchProducts(page, setSellerData, setHasMore);
    }
  }, [page, hasMore]);

  useEffect(() => {
    // 초기 데이터 로드
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]); // inView와 hasMore만 의존성 배열에 포함

  if (sellerData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Containersum>
      <MaderHomeHeader />
      <MainContainer>
        <CONTAINER>
          {renderProductList('판매 중인 상품', sellerData)}
          <div ref={ref} style={{ height: '10px' }} /> 
        </CONTAINER>
      </MainContainer>
    </Containersum>
  );
};

export default SellingProductsListPage;
