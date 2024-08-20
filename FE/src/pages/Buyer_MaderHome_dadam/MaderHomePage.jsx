import React, { useState, useEffect } from 'react';
import MaderHomeHeader from "./components/MaderHomeHeader";
import SortingDropdown from './components/SortingDropdown';
import axios from 'axios';

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
  GRID_WRAPPER,
  PROFILE_DESCRIP,
  PROFILE_COUNT,
  MainContainer,
  PROFILE_favorite,
  PROFILE_CONTAIN,
  CONTAINESUM,
  DROPDOWN,
  LOAD_MORE_BUTTON,  
} from './MaderHomePage.style';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MaderHomePage = () => {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [sortCriteria, setSortCriteria] = useState('popular');
  const [page, setPage] = useState(0);
  const [size] = useState(10); 
  const [hasMore, setHasMore] = useState(true); 

  const fetchSellerData = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://15.165.185.157:8080/buyer/1`, {
        params: {
          sort: sortCriteria,
          page,
          size,
        },
        headers: {
          'accept': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${import.meta.env.VITE_UNIMADE_ADMIN_API_KEY}`
        }
      });

      if (reset) {
        setSellerData({
          ...response.data,
          sellingProducts: response.data.products.content,
        });
      } else {
        setSellerData(prevData => ({
          ...prevData,
          sellingProducts: [
            ...prevData.sellingProducts,
            ...response.data.products.content,
          ],
        }));
      }

      setHasMore(response.data.products.totalPages > page + 1);
    } catch (error) {
      console.error("판매자 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData(true); 
  }, [sortCriteria]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setPage(0); 
    setHasMore(true); 
  };

  const loadMoreProducts = () => {
    setPage(prevPage => prevPage + 1);
    fetchSellerData(); 
  };

  const renderProductList = (title, products) => {
    return (
      <SECTION_CONTAINER>
        <CONTAINESUM>
          <SECTION_TITLE>
            {title}
          </SECTION_TITLE>
          <DROPDOWN>
            <SortingDropdown onSortChange={handleSortChange} />
          </DROPDOWN>
        </CONTAINESUM>
        <GRID_WRAPPER>
          {products.map((product) => (
            <ITEM_CONTAINER key={product.productId}>
              <PRODUCT_CARD style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none', backgroundColor: '#f0f0f0', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <PRODUCT_DETAILS>
                <PRODUCT_NAME>{product.name}</PRODUCT_NAME>
                <PRODUCT_PRICE>{product.price.toLocaleString()}원</PRODUCT_PRICE>
              </PRODUCT_DETAILS>
            </ITEM_CONTAINER>
          ))}
        </GRID_WRAPPER>
        {loading && <div>로딩 중...</div>}
        {!loading && hasMore && (
          <LOAD_MORE_BUTTON onClick={loadMoreProducts}>더 불러오기</LOAD_MORE_BUTTON>
        )}
      </SECTION_CONTAINER>
    );
  };

  if (!sellerData) {
    return <div>로딩 중...</div>;
  }

  return (
    <MainContainer>
      <MaderHomeHeader />
      <CONTAINER>
        <PROFILE_CONTAINER>
          <PROFILE_IMAGE style={{ backgroundImage: sellerData.profileImage ? `url(${sellerData.profileImage})` : 'none', backgroundColor: '#f0f0f0' }} />
          <div>
            <PROFILE_CONTAIN>
              <PROFILE_NAME>{sellerData.name}</PROFILE_NAME>
              <PROFILE_favorite>
                {sellerData.favoriteSeller ? <FaHeart /> : <FaRegHeart />}
              </PROFILE_favorite>
            </PROFILE_CONTAIN>
            <PROFILE_DESCRIP>{sellerData.description}</PROFILE_DESCRIP>
            <ADD_PRODUCT_BUTTON>팔로우</ADD_PRODUCT_BUTTON>
            <PROFILE_COUNT>{sellerData.favoriteCount}</PROFILE_COUNT>
          </div>
          <SETTINGS_ICON />
        </PROFILE_CONTAINER>
        {renderProductList('판매 중인 상품', sellerData.sellingProducts)}
      </CONTAINER>
    </MainContainer>
  );
};

export default MaderHomePage;
