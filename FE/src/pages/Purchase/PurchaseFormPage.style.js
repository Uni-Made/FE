import styled from "styled-components";
import { TbFileText } from "react-icons/tb";

const Container = styled.div`
  /* width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center; */

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  /* height: 100vh; */
  gap: 5vh;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const HeaderIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  background-color: rgba(0, 221, 221, 1);
  border-radius: 100%;
`;
const HeaderBoxIcon = styled(TbFileText)`
  color: white;
  font-size: 26px;
`;
const HeaderBoxText = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const MainBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2vh;
`;
const MainToggleBox = styled.div`
  width: 60%;
  display: flex;
  gap: 2%;
`;
const MainToggleBoxButton = styled.button`
  width: 49%;
  height: 50px;
  border: none;
  border-radius: 10px;
  //props로
  background-color: rgba(0, 221, 221, 1);
  color: white;
`;
const MainErrorText = styled.div``;

const PrivacyBox = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PrivacyToggleBox = styled.div`
  input {
  }
  div {
  }
`;
const PurchaseButton = styled.button``;

export {
  Container,
  HeaderBox,
  HeaderIconBox,
  HeaderBoxIcon,
  HeaderBoxText,
  MainBox,
  MainToggleBox,
  MainToggleBoxButton,
  MainErrorText,
  PrivacyBox,
  PrivacyToggleBox,
  PurchaseButton,
};
