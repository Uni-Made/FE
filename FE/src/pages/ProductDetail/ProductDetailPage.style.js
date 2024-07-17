import styled from "styled-components";

const Container = styled.div`
  height: 80vh;
  width: 70vw;
  gap: 5vw;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: center;
  /* align-items: center; */
  gap: 5vh;
`;
const RightContainer = styled.div`
  width: 50%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const LeftMainImage = styled.img`
  width: 70%;
  /* width: 500px; */
  height: 50%;
  border: 1px solid #24c7c4;
`;
const LeftSubBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const LeftSubBoxItem = styled.img`
  width: 20%;
  height: 90%;
  border: 1px solid #24c7c4;
`;

const RightHeader = styled.div`
  height: 5%;
  font-size: 18px;
`;
const RightProductName = styled.div`
  height: 10%;
  font-size: 32px;
  font-weight: 800;
`;
const RightDetailBox = styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
const RightDetailBoxItem = styled.div``;

const RightOptionBox = styled.div`
  height: 40%;
  overflow-y: auto;
`;
const RightOptionBoxItem = styled.div``;
const RightPriceBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: 26px;

  span {
    font-size: 40px;
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
