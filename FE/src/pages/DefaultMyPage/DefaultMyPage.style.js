import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const PROFILE_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-start;
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
  color: #00aaff;
  text-align: left;
`;

export const PROFILE_LINK = styled.span`
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const SETTINGS_ICON = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const SECTION_CONTAINER = styled.div`
  margin-bottom: 40px;
`;

export const SECTION_TITLE = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
`;

export const ITEM_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PRODUCT_CARD = styled.div`
  width: 120px;
  height: 120px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
`;

export const PRODUCT_DETAILS = styled.div`
  width: 120px;
  text-align: left;
`;

export const SHOP_NAME = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
`;

export const PRODUCT_NAME = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 12px;
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
