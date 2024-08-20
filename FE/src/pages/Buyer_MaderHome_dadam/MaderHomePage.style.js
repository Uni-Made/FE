import styled from 'styled-components';

export const MainContainer = styled.div`
  overflow-x: hidden; 
  max-width: 100%;
  width:100%;
`;

export const LOAD_MORE_BUTTON = styled.button`
  background-color: #ff00a5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  font-size: 16px;
  
  &:hover {
    background-color: #e60094;
  }
`;


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
  position: relative;
`;

export const PROFILE_IMAGE = styled.div`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #aaa;
  background-size: cover;
  background-position: center;
`;

export const PROFILE_NAME = styled.span`
  font-size: 34px;
  color: #ff00a5;
  text-align: left;
  font-weight: bold;
`;

export const PROFILE_DESCRIP = styled.div`
  font-size: 19px;
  color: #636363;
  text-align: left;
`;
export const PROFILE_CONTAIN = styled.div`
  width: 700px;
`;

export const ADD_PRODUCT_BUTTON = styled.span`
  font-size: 19px;
  margin-top: 10px;
`;

export const PROFILE_favorite = styled.span`
  font-size: 30px;
  margin-left:450px;
`;

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
  font-size: 25px;
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left:10px;
`;

export const DROPDOWN = styled.div`
  margin-bottom:10px;
  margin-left:690px;
  display:flex;
`;

export const CONTAINESUM = styled.div`
  width: 950px;
  display:flex;
`;

export const GRID_WRAPPER = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 items per row */
  gap: 20px; /* Adjust spacing between items */
`;

export const ITEM_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PRODUCT_CARD = styled.div`
  width: 210px;
  height: 210px; /* Fixed height for the product image */
  background-color: #f0f0f0;
  background-size: cover; /* Ensure the image covers the entire div */
  background-position: center; /* Center the image within the div */
  background-repeat: no-repeat; /* Prevent the image from repeating */
`;

export const PRODUCT_DETAILS = styled.div`
  width: 100%;
  text-align: left;
`;

export const PRODUCT_NAME = styled.div`
  font-size: 17px;
  margin-top: 10px;
  margin-left:10px;
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 17px;
  margin-top: 10px;
  margin-left:10px;
`;
