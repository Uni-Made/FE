import styled from "styled-components";

const Container = styled.div`
  /* height: 80vh; */
  width: 80vw;
`;

const TopContainer = styled.div`
  height: 110vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-top: 12vh;
  gap: 30px;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LeftContainer = styled.div`
  width: 54%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 5vh;
`;
const RightContainer = styled.div`
  width: 46%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;

const LeftMainImage = styled.img`
  width: 90%;
  /* width: 500px; */
  height: 65%;
  border: 1px solid #24c7c4;
`;
const LeftSubBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const LeftSubBoxItem = styled.img`
  width: 23%;
  height: 90%;
  border: 1px solid #24c7c4;
`;

const RightHeader = styled.div`
  height: 5%;
  font-size: 28px;
`;
const RightProductName = styled.div`
  height: 10%;
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const RightDetailBox = styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;
  font-size: 38px;
  align-items: baseline;
  margin-bottom: 40px;
`;
const RightDetailBoxItem = styled.div``;

const RightOptionBox = styled.div`
  height: 30%;
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
const RightPriceBoxItem = styled.div``;

const RightPurchaseButton = styled.button`
  height: 10%;
  background-color: #4cd5d5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #3cb8b8;
  }

  &:active {
    background-color: #2fa1a1;
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
