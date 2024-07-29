import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 1000px; /* 상자 너비와 동일하게 설정 */
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const PROFILE_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

export const PROFILE_IMAGE = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 20px;
  position: relative;
`;

export const PROFILE_NAME = styled.div`
  font-size: 24px;
  color: #ff00a5; /* 분홍색 텍스트 */
  text-align: left; /* 왼쪽 정렬 */
`;

export const ADD_PRODUCT_BUTTON = styled.button`
  background-color: #ff00a5; /* 분홍색 배경 */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
`;

export const SETTINGS_ICON = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const SECTION_CONTAINER = styled.div`
  margin-bottom: 40px; /* 더 큰 간격 */
`;

export const SECTION_TITLE = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left; /* 왼쪽 정렬 */
  display: flex;
  align-items: center;
`;

export const ITEM_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
`;

export const PRODUCT_CARD = styled.div`
  width: 120px; /* 상자 크기 증가 */
  height: 120px; /* 상자 크기 증가 */
  background-color: #f0f0f0;
  margin-bottom: 10px; /* 상자와 텍스트 사이의 간격 */
`;

export const PRODUCT_DETAILS = styled.div`
  width: 120px; /* 상자의 너비와 동일하게 설정 */
  text-align: left; /* 왼쪽 정렬 */
`;

export const SHOP_NAME = styled.div`
  font-size: 10px; /* 두 단계로 줄임 */
  margin-bottom: 5px;
`;

export const PRODUCT_NAME = styled.div`
  font-size: 12px; /* 한 단계로 줄임 */
  margin-top: 5px;
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 12px; /* 한 단계로 줄임 */
  margin-top: 5px;
`;

export const ARROW = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;

  &.slick-prev {
    left: -40px;
  }

  &.slick-next {
    right: -40px;
  }
`;
