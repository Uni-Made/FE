import React from "react";
import Navbar from "../ProductList/components/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/Rectangle.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-image: url(${bgImg}); /* public 폴더의 이미지 경로 */
  background-size: cover;
  background-position: center; /* 이미지의 위치를 가운데로 설정 */
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #00b1b1;
`;

const Button = styled.button`
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

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container>
        <Title>입력하신 경로의 페이지는 없습니다!!</Title>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          메인 화면으로 돌아가기
        </Button>
      </Container>
    </>
  );
}

export default NotFoundPage;
