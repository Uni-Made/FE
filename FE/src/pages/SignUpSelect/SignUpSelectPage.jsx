import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, SellerButton, BuyerButton } from './SignUpSelectPage.style';
import SignUpHeader from '../SignUp/SignUpHeader';

function SignUpSelectPage() {
  const navigate = useNavigate();

  const handleSellerSignUp = () => {
    navigate('/signUp', { state: { userType: 'seller' } });
  };

  const handleBuyerSignUp = () => {
    navigate('/signUp', { state: { userType: 'buyer' } });
  };

  return (
      <>
        <SignUpHeader />

        <Title> Uni-Made </Title>
        <Text>메이더가 되어 상품을 판매하시나요?</Text>
        <SellerButton onClick={handleSellerSignUp}><span>판매자</span> 회원가입</SellerButton>
        <Text>메이더들이 만든 상품을 구매하시나요?</Text>
        <BuyerButton onClick={handleBuyerSignUp}><span>구매자</span> 회원가입</BuyerButton>
      </>
    );
}

export default SignUpSelectPage;
