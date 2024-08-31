import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
  margin-right: 10px;
  justify-content: center; 
  font-family: Arial, sans-serif;
`;

export const PROFILE_CONTAINER = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-start;
  position: relative
`;


export const PROFILE_IMAGE = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  position: relative;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #aaa;
  background-size: cover;
  background-position: center;
  cursor: pointer;  
  overflow: hidden;
`;

export const PROFILE_PLACEHOLDER = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;
`
 
export const PROFILE_IMAGE_BUTTON = styled.div `
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 30px;
  background-color: rgba(249, 249, 249, 0.8);
  color: #00bfff;
  border-radius: 0 0 60px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  overflow: hidden; 
`

export const PROFILE_NAME = styled.div`
  font-size: 24px;
  color: #00bfff;
  text-align: left;
  font-weight: bold;
`;

export const PROFILE_LINK = styled.span`
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const SETTINGS_ICON = styled.div`
  position: absolute;
  right: 240px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url('https://cdn-icons-png.flaticon.com/512/3119/3119338.png');
  background-size: cover;
  background-position: center;
`;

export const SECTION_CONTAINER = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const SECTION_TITLE = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
  font-weight: bold;
`;

export const ITEMS_WRAPPER = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px; !important
`;

export const ITEM_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  box-sizing: border-box;
  width: 250px;
  height: 300px;
  margin-left: -10px;
  margin-right: 5px
`;

export const PRODUCT_CARD = styled.div`
  width: 230.12px;
  height: 230.44px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
`;

export const PRODUCT_DETAILS = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 10px !important; /* !important로 마진 강제 적용 */

`;

export const SHOP_NAME = styled.div`
  font-size: 12px;
  color: #888;
  font-weight: bold;
`;

export const PRODUCT_NAME = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #000; /* 텍스트를 검정색으로 설정 */
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 12px;
  margin-top: 5px;
  color: #000; /* 텍스트를 검정색으로 설정 */
`;

export const VIEW_MORE_BUTTON = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 10px;
  cursor: pointer;
  margin-left: 10px;
`;
