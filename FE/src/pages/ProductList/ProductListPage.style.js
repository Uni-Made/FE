import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  /* height: 100vh; */
  overflow-y: auto;
  gap: 5vh;
`;

const OrderBox = styled.div`
  width: 65vw;
  display: flex;
  justify-content: flex-end;
`;

const ListBox = styled.div`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export { Container, OrderBox, ListBox };
