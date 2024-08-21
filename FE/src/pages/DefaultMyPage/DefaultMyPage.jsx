import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../ProductList/components/Navbar';
import {
  CONTAINER,
  PROFILE_CONTAINER,
  PROFILE_IMAGE,
  PROFILE_PLACEHOLDER,
  PROFILE_IMAGE_BUTTON,
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
  ITEMS_WRAPPER,
  VIEW_MORE_BUTTON
} from './DefaultMyPage.style';
import { authInstance } from '../../api/axiosInstance';

//--------------------------------------API 호출

async function getDefaultMyPage() {
  try {
    const response = await authInstance.get("/buyer/myPage");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
}

//--------------------------------------MAIN

const DefaultMyPage = () => {
  const [buyerData, setBuyerData] = useState({
    name: '',
    profileImg: null,
    favoriteProducts: [],
    favoriteSellers: []
  });
  const [profileImage, setProfileImage] = useState(null);  // profileImage 상태 추가
  const fileInputRef = useRef(null);  // 파일 입력 참조 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getDefaultMyPage();
        const { name, profileImg, favoriteProducts, favoriteSellers } = response.result;
        setBuyerData({
          name,
          profileImg,
          favoriteProducts: favoriteProducts.slice(0, 4), // 찜한 상품 상위 4개
          favoriteSellers: favoriteSellers.slice(0, 4) // 찜한 메이더 상위 4개
        });
        setProfileImage(profileImg);  // 기존 프로필 이미지 설정
      } catch (error) {
        console.error('Error fetching buyer data:', error);
        setError('Error loading buyer data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 이미지 업로드 클릭 핸들러
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 변경 핸들러 및 서버로 전송
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);  // 'profileImage' 대신 'image'로 변경

      try {
        // 서버에 PATCH 요청으로 프로필 이미지 업데이트 (헤더 포함)
        const response = await authInstance.patch('/buyer/update/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 성공 시 상태 업데이트
        setProfileImage(URL.createObjectURL(file));
        console.log('Profile image updated successfully:', response.data);
        alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('Error updating profile image:', error);
        alert('프로필 이미지 업데이트 중 오류가 발생했습니다.');
      }
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />  {/* Header 컴포넌트를 맨 위에 렌더링 */}
      <CONTAINER>
        <PROFILE_CONTAINER>
          <PROFILE_IMAGE
            style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}
            onClick={handleImageUploadClick}
          >
            {!profileImage && <PROFILE_PLACEHOLDER></PROFILE_PLACEHOLDER>}
            <PROFILE_IMAGE_BUTTON>+</PROFILE_IMAGE_BUTTON>
          </PROFILE_IMAGE>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleImageChange} 
            accept="image/*" 
          />
          <div>
            <PROFILE_NAME>{buyerData.name}</PROFILE_NAME>
            <div>
              <PROFILE_LINK onClick={() => navigate('/defaultMyPage/purchase/History')}>구매내역</PROFILE_LINK>{'   '}|{'   '}
              <PROFILE_LINK onClick={() => navigate('/defaultMyPage/modify/myInfo')}>회원이름 수정/탈퇴 </PROFILE_LINK>
            </div>
          </div>
          <SETTINGS_ICON />
        </PROFILE_CONTAINER>

        <SECTION_CONTAINER>
          <SECTION_TITLE>
            찜한 상품
            <VIEW_MORE_BUTTON onClick={() => navigate('/defaultMyPage/favorite/products')}>자세히 보기</VIEW_MORE_BUTTON>
          </SECTION_TITLE>
          <ITEMS_WRAPPER>
            {buyerData.favoriteProducts.map((product, index) => (
              <ITEM_CONTAINER onClick={() => navigate('/product/'+product.productId)} key={index}>
                <PRODUCT_CARD style={{ backgroundImage: product.productImage ? `url(${product.productImage})` : 'none', backgroundColor: '#f0f0f0' }} />
                <PRODUCT_DETAILS>
                  <PRODUCT_NAME>{product.name}</PRODUCT_NAME>
                  <PRODUCT_PRICE>{product.price.toLocaleString()}원</PRODUCT_PRICE>
                </PRODUCT_DETAILS>
              </ITEM_CONTAINER>
            ))}
          </ITEMS_WRAPPER>
        </SECTION_CONTAINER>

        <SECTION_CONTAINER>
          <SECTION_TITLE>
            찜한 메이더
            <VIEW_MORE_BUTTON onClick={() => navigate('/defaultMyPage/favorite/maders')}>자세히 보기</VIEW_MORE_BUTTON>
          </SECTION_TITLE>
          <ITEMS_WRAPPER>
            {buyerData.favoriteSellers.map((seller, index) => (
              <ITEM_CONTAINER onClick={() => navigate('/maderHome/'+ seller.sellerId)} key={index}>
                <PRODUCT_CARD style={{ backgroundImage: seller.profileImage ? `url(${seller.profileImage})` : 'none', backgroundColor: '#f0f0f0' }} />
                <PRODUCT_DETAILS>
                  <SHOP_NAME>{seller.shopName}</SHOP_NAME>
                  <PRODUCT_NAME>{seller.name}</PRODUCT_NAME>
                </PRODUCT_DETAILS>
              </ITEM_CONTAINER>
            ))}
          </ITEMS_WRAPPER>
        </SECTION_CONTAINER>
      </CONTAINER>
    </>
  );
};

export default DefaultMyPage;
