import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import FavoriteHeader from './components/FavoriteHeader';
import FavoriteFooter from './components/FavoriteFooter';
import { IoPersonSharp } from 'react-icons/io5';

import {
  CONTAINER,
  SECTION_CONTAINER,
  SECTION_TITLE,
  ITEM_CONTAINER,
  PRODUCT_CARD,
  PRODUCT_DETAILS,
  GRID_WRAPPER,
  MainContainer,
  PRODUCT_ID,
  Containersum,
} from "./FavoriteProductListPage.style";

// 상품 리스트 렌더링 컴포넌트
const renderSellerList = (title, sellers, handleSellerClick) => {
  return (
    <SECTION_CONTAINER>
      <SECTION_TITLE>{title}</SECTION_TITLE>
      <GRID_WRAPPER>
        {sellers.map((seller, index) => (
          <ITEM_CONTAINER key={`${seller.sellerId}-${index}`}>
            <PRODUCT_CARD
              style={{
                backgroundImage: seller.profileImage
                  ? `url(${seller.profileImage})`
                  : "none",
                backgroundColor: "#f0f0f0",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: seller.profileImage ? 'block' : 'flex', // 프로필 이미지가 없으면 flex로 아이콘을 표시
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: seller.profileImage ? 'inherit' : '3em', // 아이콘 크기 조정
                color: '#ccc', // 아이콘 색상
              }}
              onClick={() => handleSellerClick(seller.sellerId)}
            >
              {!seller.profileImage && <IoPersonSharp />} {/* 프로필 이미지가 없으면 아이콘 표시 */}
            </PRODUCT_CARD>
            <PRODUCT_DETAILS>
              <PRODUCT_ID>{seller.name}</PRODUCT_ID>
            </PRODUCT_DETAILS>
          </ITEM_CONTAINER>
        ))}
      </GRID_WRAPPER>
    </SECTION_CONTAINER>
  );
};

const fetchSellers = async (cursor, setSellerData, setHasMore, setCursor) => {
  console.log("Fetching cursor:", cursor);
  const accessToken = localStorage.getItem("accessToken");

  try {
    const url = `http://15.165.185.157:8080/buyer/favorite-sellers?pageSize=12${cursor ? `&cursor=${cursor}` : ''}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json;charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    setSellerData((prevData) => [...prevData, ...data.result.favoriteSellers]);

    if (data.result.isLast) {
      setHasMore(false);
    } else {
      setCursor(data.result.nextCursor);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const FavoriteSellersListPage = () => {
  const [sellerData, setSellerData] = useState([]);
  const [cursor, setCursor] = useState(null); // 초기 cursor 값 설정
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 설정
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  const navigate = useNavigate();

  const handleSellerClick = (sellerId) => {
    navigate(`/maderHome/${sellerId}`);
  };

  const fetchData = useCallback(async () => {
    if (hasMore) {
      await fetchSellers(cursor, setSellerData, setHasMore, setCursor, setIsLoading);
    }
  }, [cursor, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchData();
    }
  }, [inView, fetchData, hasMore]);


  if (isLoading && sellerData.length === 0) {
    // 로딩 중일 때는 "로딩 중..." 메시지 표시
    return (
      <Containersum>
        <FavoriteHeader />
        <MainContainer>
          <CONTAINER>
            <SECTION_CONTAINER>
              <SECTION_TITLE>찜한 메이더</SECTION_TITLE>
              <GRID_WRAPPER>로딩 중...</GRID_WRAPPER>
            </SECTION_CONTAINER>
            {/* <FavoriteFooter /> */}
          </CONTAINER>
        </MainContainer>
      </Containersum>
    );
  }

  if (sellerData.length === 0) {
    // 데이터가 없을 때 메시지 표시
    return (
      <Containersum>
        <FavoriteHeader />
        <MainContainer>
          <CONTAINER>
            {sellerData.length === 0 ? (
              // 데이터가 없을 때 메시지 표시
              <SECTION_CONTAINER>
                <SECTION_TITLE>찜한 메이더</SECTION_TITLE>
                <GRID_WRAPPER>찜한 메이더가 없습니다.</GRID_WRAPPER>
              </SECTION_CONTAINER>
            ) : (
              renderSellerList("찜한 메이더", sellerData, handleSellerClick)
            )}
            <div ref={ref} style={{ height: "10px" }} />
            {/* <FavoriteFooter /> */}
          </CONTAINER>
        </MainContainer>
      </Containersum>
    );
  }

  return (
    <Containersum>
      <FavoriteHeader />
      <MainContainer>
        <CONTAINER>
          {renderSellerList("찜한 메이더", sellerData, handleSellerClick)}
          <div ref={ref} style={{ height: "10px" }} />
          {/* <FavoriteFooter /> */}
        </CONTAINER>
      </MainContainer>
    </Containersum>
  );
};

export default FavoriteSellersListPage;