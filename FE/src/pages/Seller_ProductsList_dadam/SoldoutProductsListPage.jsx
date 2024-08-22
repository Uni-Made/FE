import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import MaderHomeHeader from "./components/MaderHomeHeader";
import ProductsFooter from "./components/ProductsFooter";
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
} from "./SoldoutProductsListPage.style";

// 상품 리스트 렌더링 컴포넌트
const renderProductList = (title, products, handleProductClick) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <GRID_WRAPPER>
        {products.map((product) => (
          <ITEM_CONTAINER key={product.productId}>
            <PRODUCT_CARD
              style={{
                backgroundImage: product.imageUrl
                  ? `url(${product.imageUrl})`
                  : "none",
                backgroundColor: "#f0f0f0",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleProductClick(product.productId)} 
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
  console.log("Fetching page:", page);

  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(
      `http://15.165.185.157:8080/seller/myPage/soldoutProducts?page=${page}&size=12`,
      {
        method: "GET",
        headers: {
          accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    setSellerData((prevData) => [...prevData, ...data.content]);

    if (data.last) {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const SoldoutProductsListPage = () => {
  const [sellerData, setSellerData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/maderMyPage/products/selling/${productId}`);
  };

  const fetchData = useCallback(async () => {
    if (hasMore) {
      await fetchProducts(page, setSellerData, setHasMore);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  if (sellerData.length === 0) {
    return (
      <Containersum>
        <MaderHomeHeader />
        <MainContainer>
          <CONTAINER>
            <SECTION_CONTAINER>
              <SECTION_TITLE>판매 종료된 상품</SECTION_TITLE>
              <GRID_WRAPPER>판매 종료된 상품이 없습니다.</GRID_WRAPPER>
            </SECTION_CONTAINER>
            {/* <ProductsFooter/> */}
          </CONTAINER>
        </MainContainer>
      </Containersum>
    );
  }

  return (
    <Containersum>
      <MaderHomeHeader />
      <MainContainer>
        <CONTAINER>
          {renderProductList(
            "판매 종료된 상품",
            sellerData,
            handleProductClick
          )}
          <div ref={ref} style={{ height: "10px" }} />
          {/* <ProductsFooter/> */}
        </CONTAINER>
      </MainContainer>
    </Containersum>
  );
};

export default SoldoutProductsListPage;
