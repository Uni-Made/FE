import styled, { css } from 'styled-components';


export const CONTAINER = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const FORM = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SECTION = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 20px;
`;

export const INPUT_CONTAINER = styled.div`
  flex: 1;
  min-width: 0; /* 컨테이너가 부모 요소를 벗어나지 않도록 설정 */
  position: relative;
  margin-bottom: 5px; /* 필요 시 조정 */
  margin-top: 0px;
`;

export const INPUT_ROW = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 10px; /* 요소 간 간격 */
  margin-bottom: 20px;
  flex-wrap: wrap; /* 요소가 부모 요소를 넘어가면 줄 바꿈 */
  width: 100%; /* 부모 요소가 전체 너비를 차지하게 설정 */
`;

export const PRODUCT_NAME_INPUT = styled.input`
  :  
  box-sizing: border-box;
  width: 490px;
  height: 56px;
  border: 1px solid #ddd;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: black;
  padding-left: 16px;
  padding-right: 16px; /* 텍스트 입력이 박스에 잘 들어가도록 우측 패딩 추가 */

  &::placeholder {
    color: #ddd;
  }
`;

export const PRODUCT_NAME = styled.div`
  box-sizing: border-box;
  width: 520px;
  height: 56px;
  border: 1px solid #868686;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 텍스트가 왼쪽으로 정렬되도록 추가 */

  position: relative;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: black;
  padding-left: 16px; /* 텍스트를 왼쪽으로부터 16px 떨어뜨림 */
`;

export const INPUT = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const INPUT_DATE = styled.input`
  width: 265px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 10; /* z-index를 높여 달력 버튼이 다른 요소 위에 나타나도록 설정 */
  position: relative; /* z-index가 적용되도록 position 설정 */
  background-color: white;

  ::-webkit-calendar-picker-indicator {
    cursor: pointer; /* 달력 버튼에 커서를 포인터로 변경 */
    z-index: 11; /* 달력 버튼의 z-index를 높게 설정하여 다른 요소들 위로 나타나게 함 */
    position: relative; 
    pointer-events: auto; /* 클릭 가능하도록 설정 */
  }

  &::placeholder {
    color: #ddd;
  }
`;

export const INPUT_PRICE = styled.input`
  width: 210px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 5px;

  &::placeholder {
    color: #ddd;
  }
`;

export const INPUT_UNIV_NAME = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transform: translateY(-6px);
  margin-right: 46px;

  &::placeholder {
    color: #ddd;
  }
`;

export const INPUT_ACCOUNT_HOLDER = styled.input`
  width: 130px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transform: translateY(-5px);

  &::placeholder {
    color: #ddd;
  }
`;

export const INPUT_ACCOUNT_NUMBER = styled.input`
  width: 240px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transform: translateY(-5px);

  &::placeholder {
    color: #ddd;
  }
`;

export const SELECT = styled.select`
  width: 180px;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-shrink: 0; /* SELECT 요소가 축소되지 않도록 설정 */
`;

export const SELECT_BANK = styled.select`
  width: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-shrink: 0; /* SELECT 요소가 축소되지 않도록 설정 */
`;


export const BUTTON = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #ff00a5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const IMAGE_UPLOAD_SECTION = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const MAIN_IMAGE_CONTAINER = styled.div`
  position: relative;
  width: 540px;
  height: 520px;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const PLACEHOLDER_IMAGE = styled.div`
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IMAGE_OVERLAY_TEXT = styled.div`
  color: #fff;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 5px;
`;

export const IMAGE_UPLOAD_BUTTON = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* 위쪽으로 10px 간격 추가 */
  text-align: center; /* 텍스트를 중앙에 정렬 */

  input {
    display: none;
  }
`;

export const SMALL_IMAGE_CONTAINER = styled.div`
  width: 100%;
  max-width: 540px;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  display: flex;
  justify-content: flex-start;
  

  .slick-slide {
    padding: 0px; /* 이미지 간 간격 조정 */
    box-sizing: border-box;
  }

  .slick-list {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
  }

  .slick-track {
    display: flex !important;
    align-items: left;
    justify-content: flex-start;
  }
`;

export const SMALL_IMAGE_PREVIEW = styled.div`
  position: relative;
  width: 100px !important; /* 고정된 가로 길이 */
  height: 100px; /* 고정된 세로 길이 */
  background: #D9D9D9;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-right: 10px; /* 이미지들 사이에 오른쪽 간격을 10px 추가 */

  &:last-child {
    margin-right: 0; /* 마지막 이미지에는 오른쪽 간격 제거 */
  }

  img {
    width: calc(100%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;


//---- Options Section
export const OPTIONS_SECTION = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  width: 45%;
  magin-top: 5px;
  overflow-x: auto;
`;

export const OPTION_GROUP = styled.div`
  width: 48%;
  margin-top: 0px;
  position: relative;
`;

export const OPTION_TITLE = styled.input`
  padding: 10px 10px;
  background-color: #ddd;
  height: 45px;
  color: #333;
  border: none;
  text-align: center; /* 텍스트를 중앙에 정렬 */
  border-radius: 4px;
  width: 100%;
  font-size: 1.2em; /* 글자 크기 증가 */
  font-weight: bold; /* 글자 굵기 설정 */
`;

export const OPTION_INPUT_WRAPPER = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  button {
    margin-left: 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const OPTION_INPUT = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;


export const ADD_OPTION_BUTTON = styled.button`
  padding: 10px 20px;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;


export const ROUND_BUTTON = styled.button`
  width: 20px;
  height: 20px;
  background-color: #ff00a5 !important;
  color: white; /* 텍스트 색상을 흰색으로 설정 */
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  align-items: center !important; /* 수직 중앙 정렬 */
  justify-content: center !important; /* 수평 중앙 정렬 */
  cursor: pointer;

  &:hover {
    background-color: #e60092; /* 호버 시 약간 어두운 색으로 변경 */
  }
`;

export const ADD_FULL_OPTION_BUTTON = styled.button`
  padding: 14.7px 10px;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0px;
`;

//---- Other Sections
export const SUBMIT_BUTTON = styled.button`
  padding: 10px 20px;
  background-color: #ff00a5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

export const LABEL = styled.label`
  position: absolute;
  top: -12px;
  left: 12px;
  background: white;
  padding: 0 4px;
  color: #868686;
  z-index: 11 !important; /* 추가: z-index 설정으로 레이블이 select보다 위에 오도록 함 */
`;

export const ONLINE_BUTTON = styled(BUTTON)`
  margin-top: 0px;
  width: 235px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 0px;
  ${({ isActive }) =>
    isActive &&
    css`
      background: #ff00a5;
      color: white;
    `}
  ${({ isActive }) =>
    !isActive &&
    css`
      background: #F4F4F4;
      color: #1D1B20;
    `}
`;

export const OFFLINE_BUTTON = styled(BUTTON)`
  margin-top: 0px;
  width: 235px;
  height: 40px;
  border-radius: 20px;
  margin-left: 10px;
  ${({ isActive }) =>
    isActive &&
    css`
      background: #ff00a5;
      color: white;
    `}
  ${({ isActive }) =>
    !isActive &&
    css`
      background: #F4F4F4;
      color: #1D1B20;
    `}
`;

export const ACCOUNT_SECTION = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 20px;
`;

export const ACCOUNT_INPUT = styled(INPUT)`
  width: auto;
  flex: 1;
  margin-right: 5px;
`;

export const INPUT_WRAPPER = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

//---- Divider Section
export const DIVIDER = styled.div`
  height: 50px; /* 높이를 50px로 조정하여 더 넓은 공간 확보 */
`;

//---- Large Image Container

export const LARGE_IMAGE_CONTAINER = styled.div`
  width: 100%;
  height: 600px; // 필요에 따라 높이를 조정하세요.
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  overflow: auto; // 스크롤 가능하게 설정

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; // 이미지를 컨테이너에 맞게 조정
  }
`;


export const PDF_UPLOAD_BUTTON = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ddd;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  input {
    display: none;
  }
`;
