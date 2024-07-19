import styled from "styled-components";

const Container = styled.div`
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
const HeaderBoxIcon = styled.div`
  color: white;
  font-size: 26px;
`;
const HeaderBoxText = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const MainBox = styled.div`
  width: 40%;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  span {
    font-weight: bold;
    color: rgba(0, 221, 221, 1);
  }
`;

const ReturnButton = styled.button`
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

export {
  Container,
  HeaderBox,
  HeaderIconBox,
  HeaderBoxIcon,
  HeaderBoxText,
  MainBox,
  ReturnButton,
};
