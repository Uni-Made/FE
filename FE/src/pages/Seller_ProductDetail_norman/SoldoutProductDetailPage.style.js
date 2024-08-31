import styled from "styled-components";
import Slider from "react-slick";

const Container = styled.div`
  /* height: 80vh; */
  width: 80vw;
  margin-bottom: 20px;

  /* 전체 스크롤바 스타일을 지정합니다 */
  ::-webkit-scrollbar {
    width: 12px; /* 세로 스크롤바 너비 */
    height: 12px; /* 가로 스크롤바 높이 */
  }

  /* 스크롤바 트랙을 스타일링합니다 */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤 트랙 색상 */
    border-radius: 10px; /* 둥근 모서리 적용 */
  }

  /* 스크롤바 손잡이를 스타일링합니다 */
  ::-webkit-scrollbar-thumb {
    background: #888; /* 손잡이 색상 */
    border-radius: 10px; /* 둥근 모서리 적용 */
    border: 3px solid #f1f1f1; /* 손잡이 주변 여백 */
  }

  /* 스크롤바 손잡이 마우스 오버 시 스타일 */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* 손잡이 색상 변경 */
  }

  /* 스크롤바 화살표 버튼을 제거합니다 */
  ::-webkit-scrollbar-button {
    display: none; /* 화살표 버튼 숨김 */
  }
`;
const TopContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* margin-top: 12vh; */
  gap: 50px;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 4vh;
`;
const RightContainer = styled.div`
  width: 46%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LeftMainImage = styled.img`
  width: 100%;
  height: 60%;
  /* object-fit: cover;  */
`;
const LeftSubBox = styled(Slider)`
  width: 100%;
  height: auto; /* 높이를 고정된 퍼센티지 대신 auto로 변경 */

  .slick-slide {
    display: flex;
    justify-content: center; /* 각 슬라이드 내에서 이미지 중앙 정렬 */
  }

  .slick-list {
    overflow: visible; /* 슬라이더가 넘칠 때도 내용이 보이도록 설정 */
    display: flex;
    justify-content: flex-start; /* 아이템들이 왼쪽에서 시작하도록 설정 */
  }

  .slick-track {
    display: flex;
    align-items: center; /* 세로로 가운데 정렬 */
    flex-direction: row; /* 가로 방향으로 정렬되도록 설정 */
  }
`;
const LeftSubBoxItem = styled.img`
  height: 20vh; // 크기 고정
  object-fit: cover; /* 이미지 비율을 유지하면서 크기에 맞게 잘라냄 */
`;

const RightHeader = styled.div`
  height: 5%;
  font-size: 26px;

  div {
    width: 30%;
    &:hover {
      cursor: pointer;
    }
  }
`;
const RightProductName = styled.div`
  height: 10%;
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const RightDetailBox = styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  align-items: baseline;
  margin-bottom: 30px;
`;
const RightDetailBoxItem = styled.div``;

const RightOptionBox = styled.div`
  height: 33%; // 이거는 원래 상품 상세 페이지랑 조금 다름
  overflow-y: auto;
`;
const RightOptionBoxItem = styled.div``;
const RightPriceBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: 40px;

  span {
    font-size: 50px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const RightPriceBoxItem = styled.div`
  span {
    position: relative;
    top: 6px;
  }
`;

const RightPurchaseButton = styled.button`
  height: 10%;
  background-color: ${(props) =>
    props.type == "modify" ? "#FF0099" : "#DDDDDD"};
  color: ${(props) => (props.type == "modify" ? "white" : "#868686")};
  padding: 10px 20px;
  border: ${(props) => (props.type == "modify" ? "1px solid #FF0099" : "none")};
  border-radius: 10px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  margin-bottom: 20px;

  &:hover {
    color: ${(props) => (props.type == "modify" ? "#FF0099" : "black")};
    background-color: ${(props) =>
      props.type == "modify" ? "white" : "#868686"};
  }
`;

export {
  Container,
  TopContainer,
  BottomContainer,
  LeftContainer,
  RightContainer,
  LeftMainImage,
  LeftSubBox,
  LeftSubBoxItem,
  RightHeader,
  RightProductName,
  RightDetailBox,
  RightDetailBoxItem,
  RightOptionBox,
  RightOptionBoxItem,
  RightPriceBox,
  RightPriceBoxItem,
  RightPurchaseButton,
};
