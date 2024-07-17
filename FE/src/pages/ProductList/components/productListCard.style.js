import styled from "styled-components";

const Container = styled.div`
  width: 15vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
`;

const FirstTitle = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
`;

const SecondTitle = styled.p`
  font-size: 18px;
`;
const Price = styled.div`
  font-size: 20px;
`;

export { Container, Image, FirstTitle, SecondTitle, Price };
