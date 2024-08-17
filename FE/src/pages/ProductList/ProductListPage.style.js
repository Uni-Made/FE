import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  gap: 2vh;
`;

const OrderBox = styled.div`
  width: 65vw;
  display: flex;
  justify-content: flex-end;

  select {
    background: none;
    border: none;
    width: 120px;
    height: 40px;
    padding: 10px 15px;
    font-size: 18px;
    color: black;
    cursor: pointer;
    border-radius: 20px;
    background-color: #f4f4f4;
    text-align: left;
    outline: none;

    &:hover {
      background-color: #e2e2e2;
    }
  }
`;

const ListBox = styled.div`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export { Container, OrderBox, ListBox };
