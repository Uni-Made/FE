import styled from 'styled-components';

export const OUTER_CONTAINER = styled.div`
  display: flex;
  justify-content: center;
`;

export const CONTAINER = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const PRODUCT_CONTAINER = styled.div`
  display: flex;
  margin-bottom: 20px; /* 큰 상자와 작은 상자 사이의 간격을 줄이기 위해 20px로 설정 */
`;

export const PRODUCT_IMAGE = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f0f0f0;
  margin-right: 20px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

export const PRODUCT_DETAILS = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PRODUCT_NAME = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

export const PRODUCT_SUB_INFO = styled.div`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

export const PRODUCT_PRICE = styled.div`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

export const BUTTON_CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
`;

export const BUTTON = styled.button`
  font-size: 18px;
  color: white;
  background-color: #ff69b4;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;

  &:hover {
    background-color: #ff1493;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const SELECT = styled.select`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

export const TAB_CONTAINER = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TAB = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ff69b4' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border-top-left-radius: ${(props) => (props.first ? '5px' : '0')};
  border-top-right-radius: ${(props) => (props.last ? '5px' : '0')};

  &:hover {
    background-color: #ff1493;
    color: #fff;
  }
`;

export const TAB_CONTENT = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
`;

export const IMAGE_SCROLL_CONTAINER = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: -10px; /* 간격을 더 줄이기 위해 음수 값으로 설정 */
  margin-bottom: 10px; /* 간격을 더 줄이기 위해 10px로 설정 */
`;

export const BUTTON_GRAY = styled(BUTTON)`  // 수정된 스타일
  background-color: #ccc;
  color: #777;
  cursor: pointer;

  &:hover {
    background-color: #bbb; // 버튼 호버 시 색상 변경
  }
`;


export const SMALL_PRODUCT_IMAGE = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.active ? '#ff69b4' : '#f0f0f0')};
  margin-right: 10px;
  cursor: pointer;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;

  &:hover {
    background-color: #ff1493;
  }
`;

//-------------Modal Part---------------------


export const MODAL_CONTAINER = styled.div`
  background: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
`;

export const MODAL_TITLE = styled.h2`
  color: #ff69b4;
  text-align: center;
`;


export const CLOSE_BUTTON = styled.button`
  background: #ff69b4;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  float: right;

  &:hover {
    background: #ff1493;
  }
`;