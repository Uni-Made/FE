import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const MainNoticeBox = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 7vh;
`;
const MainNoticeHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid black;

  div {
    position: relative;
    top: 10px;
  }
`;

const MainNoticeBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-top: 35px;
  overflow-y: auto;
`;

const ReturnButton = styled.button`
  width: 10%;
  height: 8%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  color: white;
  font-size: 18px;
  background: #2c2c2c;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  margin-top: 25px;

  &:hover {
    cursor: pointer;
    background: #3c3c3c;
  }
`;

export {
  Container,
  MainNoticeBox,
  MainNoticeHeaderBox,
  MainNoticeBodyBox,
  ReturnButton,
};
