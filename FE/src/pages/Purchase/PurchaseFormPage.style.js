import styled from "styled-components";
import { TbFileText } from "react-icons/tb";

const Container = styled.form`
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw-17px);
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

const MainBox = styled.div`
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
  background-color: ${(props) =>
    props.isSelected ? "rgba(0, 221, 221, 1)" : "rgba(244, 244, 244, 1)"};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }
`;
const MainPickUpBox = styled.div`
  /* gap: px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  background-color: rgba(244, 244, 244, 1);
  border: none;
  border-radius: 10px;
  width: 60%;
  height: 120px;
  font-size: 20px;
  padding: 10px;
`;
const MainErrorText = styled.div`
  width: 60%;
  color: ${(props) => (props.isError ? "red" : "rgba(0, 221, 221, 1)")};
  font-size: 16px;
`;

const PrivacyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PrivacyBoxTerms = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: auto;
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(244, 244, 244, 1);
  padding: 30px;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }
  font-size: 18px;
  border-radius: 10px;
`;
const PrivacyToggleBox = styled.div`
  width: 100%;
  display: flex;

  gap: 10px;
  font-size: 18px;

  input {
    width: 18px;
  }
  div {
  }
`;

const PurchaseButton = styled.button`
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: rgba(0, 221, 221, 1);
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 5vh;

  &:hover {
    background-color: rgba(0, 233, 233, 1);
  }
`;

const AddressButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export {
  Container,
  HeaderBox,
  HeaderIconBox,
  HeaderBoxIcon,
  HeaderBoxText,
  MainBox,
  MainToggleBox,
  MainToggleBoxButton,
  MainPickUpBox,
  MainErrorText,
  PrivacyBox,
  PrivacyBoxTerms,
  PrivacyToggleBox,
  PurchaseButton,
  AddressButton,
};
