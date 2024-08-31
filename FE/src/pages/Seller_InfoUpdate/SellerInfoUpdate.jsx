import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Title, Form, Label, Input, Button, ErrorMessage, DeleteButton, ModalButton, ModalContent, ModalOverlay, ButtonContainer } from './SellerInfoUpdate.style';
import { sellerInstance } from '../../api/axiosInstance';

async function getBuyerInfo() {
  try {
    const response = await sellerInstance.get(`/seller/info`);
    
    console.log('API Response:', response.data);

    const { name, password } = response.data.result;

    return { name, password };
  } catch (error) {
    console.error('Error fetching buyer info:', error);
    throw error;
  }
}

const SellerInfoUpdate = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // newPassword 상태 추가
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        const { name, password } = await getBuyerInfo();
        setName(name || '');
        setPassword(password || '');
      } catch (error) {
        setError('Error loading buyer information');
      }
    };

    fetchBuyerInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newPassword.trim()) {
      setError('새 비밀번호를 입력해야 합니다.');
      return;
    }
  
    if (newPassword === password) {
      setError('이전 비밀번호와 같습니다.');
      return;
    }
    
    if (newPassword !== passwordConfirm) {
      setError('비밀번호가 다릅니다');
      return;
    }
  
    try {
      const requestData = {
        name: name.trim(),
        password,
        newPassword: newPassword.trim()
      };
  
      const response = await sellerInstance.patch('/seller/update/info', requestData);
      
      if (response.status === 200) {
        alert('회원정보가 수정되었습니다.');
        navigate('/maderMyPage'); // Redirect to /maderMyPage
      } else {
        setError('회원정보 수정 중 오류가 발생했습니다.');
      }
  
    } catch (error) {
      console.error('Error updating buyer info:', error);
      setError('회원정보 수정 중 오류가 발생했습니다.');
    }
  };
  

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    alert('회원탈퇴가 완료되었습니다.');
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Label>이름</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>현재 비밀번호</Label> {/* 현재 비밀번호 입력 필드 */}
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label>새 비밀번호</Label> {/* 새 비밀번호 입력 필드 */}
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Label>새 비밀번호 확인</Label> {/* 새 비밀번호 확인 필드 */}
        <Input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" >수정 완료</Button>
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
  );
};

export default SellerInfoUpdate;
