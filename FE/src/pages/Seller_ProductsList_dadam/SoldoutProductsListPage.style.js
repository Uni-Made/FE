import styled from 'styled-components';

export const MainContainer = styled.div`
  overflow-x: hidden; 
  max-width: 100%;
  width:100%;
`;

export const CONTAINER = styled.div`
  width: 1300px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;`
;

export const PROFILE_COUNT = styled.span`
  font-size: 19px;
  text-align: left;
`;

export const SETTINGS_ICON = styled.div`
  position: absolute;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url('https://static-00.iconduck.com/assets.00/settings-icon-512x512-pk8wypem.png');
  background-size: cover;
  background-position: center;
`;

export const SECTION_CONTAINER = styled.div`
  margin-bottom: 40px;
`;

export const SECTION_TITLE = styled.div`
  font-size: 65px;
  margin-bottom: 80px;
  margin-top: 90px;
  color: #ff00a5;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left:10px;
  font-weight: bold;
`;

export const GRID_WRAPPER = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px; 
`;

export const ITEM_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PRODUCT_CARD = styled.div`
  width: 270px;
  height: 270px; 
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

export const PRODUCT_DETAILS = styled.div`
  width: 100%;
  text-align: left;
`;

export const PRODUCT_ID = styled.div`
  font-size: 18px;
  margin-top: 10px;
  margin-left:15px;
`;

export const PRODUCT_NAME = styled.div`
  font-size: 20px;
  margin-top: 10px;
  margin-left:15px;
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 20px;
  margin-top: 10px;
  margin-left:15px;
`;