import React, { useState, useEffect, useRef } from 'react';
import {
  CONTAINER,
  PROFILE_IMAGE,
  PROFILE_PLACEHOLDER,
  PROFILE_IMAGE_BUTTON,
  PROFILE_CONTAINER,
  PROFILE_NAME,
  PROFILE_DESCRIPTION,
  FAVORITE_COUNT,
  ADD_PRODUCT_BUTTON,
  SETTINGS_ICON,
  SECTION_CONTAINER,
  SECTION_TITLE,
  ITEM_CONTAINER,
  PRODUCT_CARD,
  PRODUCT_DETAILS,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  ITEMS_WRAPPER,
  EDIT_BUTTON,
  DESCRIPTION_INPUT,
  VIEW_MORE_BUTTON,
  INFO_EDIT_BUTTON_CONTAINER,
  INFO_EDIT_BUTTON,
} from './MaderMyPage.style';
import { authInstance, sellerInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../ProductList/components/Navbar';

async function getSellerMyPage() {
  try {
    const response = await authInstance.get(`/seller/myPage`);
    
    console.log('API Response:', response.data);

    const { name, profileImage, description, favoriteCount, sellingProducts, soldoutProducts } = response.data;
    const parsedDescription = description ? description.replace(/^"|"$/g, '') : '';
    
    return { name, profileImage, description: parsedDescription, favoriteCount, sellingProducts, soldoutProducts };
  } catch (error) {
    console.error('Error fetching seller data:', error);
    throw error;
  }
}

const MaderMyPage = () => {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getSellerMyPage();
        const { name, profileImage, description, favoriteCount, sellingProducts, soldoutProducts } = response;
        setSellerData({ 
          name, 
          profileImage, 
          description, 
          favoriteCount, 
          sellingProducts: sellingProducts.slice(0, 4), 
          soldoutProducts: soldoutProducts.slice(0, 4)
        });
        setDescription(description || '');
        setProfileImage(profileImage);  // Set the profile image initially
      } catch (error) {
        console.error('Error fetching seller data:', error);
        setError('Error loading seller data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);
  
    try {
      const response = await authInstance.put('/seller/description', JSON.stringify(description), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
  
      console.log('Description updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };
  

  const handleAddProductClick = () => {
    navigate('/maderMyPage/product/register');
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await authInstance.patch('/seller/update/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // If successful, update the profile image in the state
        setProfileImage(URL.createObjectURL(file));
        console.log('Profile image updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating profile image:', error);
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
    <Header /> 
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
          <PROFILE_NAME>{sellerData.name}</PROFILE_NAME>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EDIT_BUTTON onClick={handleEditClick} />
            {isEditing ? (
              <DESCRIPTION_INPUT 
                value={description} 
                onChange={handleDescriptionChange} 
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <PROFILE_DESCRIPTION>{description || '메이더 설명을 입력해주세요.'}</PROFILE_DESCRIPTION>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FAVORITE_COUNT>Follower {sellerData.favoriteCount} |</FAVORITE_COUNT>
            <INFO_EDIT_BUTTON_CONTAINER>
              <INFO_EDIT_BUTTON onClick={() => navigate('/maderMyPage/modify/myInfo')}> 회원정보 수정</INFO_EDIT_BUTTON>
            </INFO_EDIT_BUTTON_CONTAINER>
          </div>
          <ADD_PRODUCT_BUTTON onClick={handleAddProductClick}>새로운 상품 등록하기</ADD_PRODUCT_BUTTON>
        </div>
        <SETTINGS_ICON />
      </PROFILE_CONTAINER>

      <SECTION_CONTAINER>
        <SECTION_TITLE>
          판매 중인 상품
          <VIEW_MORE_BUTTON onClick={() => navigate('/maderMyPage/products/selling')}>자세히 보기</VIEW_MORE_BUTTON>
        </SECTION_TITLE>
        <ITEMS_WRAPPER>
          {sellerData.sellingProducts.map(product => (
            <ITEM_CONTAINER onClick={() => navigate('/maderMyPage/products/selling/'+ product.productId)} key={product.productId}>
              <PRODUCT_CARD style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none', backgroundColor: '#f0f0f0' }} />
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
          판매 종료된 상품
          <VIEW_MORE_BUTTON onClick={() => navigate('/maderMyPage/products/soldout')}>자세히 보기</VIEW_MORE_BUTTON>
        </SECTION_TITLE>
        <ITEMS_WRAPPER>
          {sellerData.soldoutProducts.map(product => (
            <ITEM_CONTAINER onClick={() => navigate('/maderMyPage/products/soldout/'+ product.productId)} key={product.productId}>
              <PRODUCT_CARD style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none', backgroundColor: '#f0f0f0' }} />
              <PRODUCT_DETAILS>
                <PRODUCT_NAME>{product.name}</PRODUCT_NAME>
                <PRODUCT_PRICE>{product.price.toLocaleString()}원</PRODUCT_PRICE>
              </PRODUCT_DETAILS>
            </ITEM_CONTAINER>
          ))}
        </ITEMS_WRAPPER>
      </SECTION_CONTAINER>
    </CONTAINER>
    </>
  );
};

export default MaderMyPage;
