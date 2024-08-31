import React, { useState, useEffect } from 'react';
import { Container, Title, Form, Label, Input, Button, ErrorMessage } from './UserInfoUpdatePage.style';
import styled from 'styled-components';
import axios from 'axios'; // axios를 사용하여 API 호출
import Navbar from "../ProductList/components/Navbar";

const BuyerInfoModifyPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 초기 사용자 정보를 불러오기 위한 GET 요청
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://15.165.185.157:8080/buyer/info",
          {
            headers: {
              accept: "application/json;charset=UTF-8",
              Authorization:
                "Bearer " + import.meta.env.VITE_WOONG_SELLER_API_KEY,
            },
          }
        );
        const { name } = response.data.result;
        setName(name || "");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버로 수정된 정보를 PATCH 요청으로 전송
      await axios.patch(
        "http://15.165.185.157:8080/buyer/update/info",
        {
          name,
        },
        {
          headers: {
            Authorization:
              "Bearer " + import.meta.env.VITE_WOONG_SELLER_API_KEY,
          },
        }
      );
      alert("이름이 수정되었습니다.");
    } catch (error) {
      console.error("Error updating user info:", error);
      setError("이름 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // 여기에 회원탈퇴 API 호출 로직을 추가하세요
    alert("회원탈퇴가 완료되었습니다.");
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>이름 수정</Title>
        <Form onSubmit={handleSubmit}>
          <Label>이름</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">완료</Button>
        </Form>

        <DeleteButton onClick={handleDeleteAccount}>회원탈퇴</DeleteButton>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <p>회원을 탈퇴하시겠습니까?</p>
              <ButtonContainer>
                <ModalButton onClick={handleConfirmDelete}>확인</ModalButton>
                <ModalButton onClick={handleCancelDelete}>취소</ModalButton>
              </ButtonContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </>
  );
};

export default BuyerInfoModifyPage;

// 스타일 컴포넌트 정의

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;

  &:nth-child(2) {
    background-color: gray;
  }
`;
